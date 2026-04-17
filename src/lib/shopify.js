/**
 * Shopify Storefront API Layer
 * Real Shopify Integration
 */

import { categories, testimonials, trustBadges } from "./mockData";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  if (!domain || !token) {
    console.error("Missing Shopify Credentials!");
    return { data: null };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // Used no-store to keep data always fresh during dev/testing
  });
  
  const json = await res.json();
  if (json.errors) {
    console.error("Shopify GraphQL Error:", json.errors);
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

function normalizeShopifyProduct(node) {
  if (!node) return null;
  const variant = node.variants?.edges?.[0]?.node;
  return {
    id: node.id,
    variantId: variant?.id,
    name: node.title,
    slug: node.handle,
    price: variant?.price?.amount ? parseFloat(variant.price.amount) : 0,
    originalPrice: variant?.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : null,
    category: node.productType || "General",
    ageRange: node.vendor || "All Ages",
    description: node.description,
    image: node.images?.edges?.[0]?.node?.url || "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop&q=80",
    images: node.images?.edges?.map(e => e.node.url) || [],
    rating: 5.0, // Default display logic
    reviews: Math.floor(Math.random() * 50) + 12, // Default display logic
    badge: node.tags?.includes("hot") ? "hot" : node.tags?.includes("new") ? "new" : node.tags?.includes("sale") ? "sale" : null,
  };
}

export async function getProducts(filters = {}) {
  const query = `
    query getProducts($query: String!) {
      products(first: 50, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            vendor
            tags
            images(first: 5) {
              edges { node { url } }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price { amount }
                  compareAtPrice { amount }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  let searchQuery = "status:active";
  const data = await shopifyFetch(query, { query: searchQuery });
  if (!data?.products?.edges) return [];
  
  let filtered = data.products.edges.map(e => normalizeShopifyProduct(e.node));

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
    }
  }

  return filtered;
}

export async function getProduct(slug) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        productType
        vendor
        tags
        images(first: 5) {
          edges { node { url } }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price { amount }
              compareAtPrice { amount }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle: slug });
  return normalizeShopifyProduct(data?.product);
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.slice(0, 8); // Or filter by tags
}

export async function getSaleProducts() {
  const products = await getProducts();
  return products.filter(p => p.badge === "sale" || p.originalPrice);
}

export async function getCategories() {
  return categories; // Preserved static UI UI categories
}

export async function getTestimonials() {
  return testimonials; // Preserved static UI testionials
}

export async function getTrustBadges() {
  return trustBadges; // Preserved static UI trust badges
}

export async function searchProducts(query) {
  return getProducts({ search: query });
}

export async function createCheckout(lineItems) {
  // Using the newer cartCreate store API mutation
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl id }
        userErrors { message }
      }
    }
  `;
  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId, 
        quantity: item.quantity,
      })),
    },
  };
  const data = await shopifyFetch(query, variables);
  
  if (data?.cartCreate?.userErrors?.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return data?.cartCreate?.cart?.checkoutUrl;
}
