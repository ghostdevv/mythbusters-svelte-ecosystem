interface NpmSearchResponse {
  total: number;
  objects: {
    package: {
      name: string;
    };
  }[];
}

async function getPackageCount(searchTerm: string): Promise<number> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=1`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as NpmSearchResponse;
    return data.total;
  } catch (error) {
    console.error(`Error fetching ${searchTerm} packages:`, error);
    Deno.exit(1);
  }
}

const svelteCount = await getPackageCount("svelte");
const reactCount = await getPackageCount("react");

console.log(`📦 Package counts:`);
console.log(`React    : ${reactCount.toLocaleString()}`);
console.log(`Svelte   : ${svelteCount.toLocaleString()}`);
