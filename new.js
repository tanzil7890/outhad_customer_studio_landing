// Script to create larger and thicker "O" paths
const originalO = "M-12,30 A12,12 0 1,1 12,30 A12,12 0 1,1 -12,30 M-6,30 A6,6 0 1,0 6,30 A6,6 0 1,0 -6,30";

console.log("=== ORIGINAL 'O' ===");
console.log(`Path: ${originalO}`);
console.log("Outer radius: 12, Inner radius: 6 (weight: 6)");

// Function to create custom "O" with different size and weight
function createCustomO(x, y, outerRadius, weight) {
    const innerRadius = outerRadius - weight;
    
    // Outer circle (clockwise)
    const outerPath = `M${x - outerRadius},${y} A${outerRadius},${outerRadius} 0 1,1 ${x + outerRadius},${y} A${outerRadius},${outerRadius} 0 1,1 ${x - outerRadius},${y}`;
    
    // Inner circle (counter-clockwise to create hole)
    const innerPath = `M${x - innerRadius},${y} A${innerRadius},${innerRadius} 0 1,0 ${x + innerRadius},${y} A${innerRadius},${innerRadius} 0 1,0 ${x - innerRadius},${y}`;
    
    return `${outerPath} ${innerPath}`;
}

console.log("\n=== SIZE VARIATIONS ===");

// 1.5x larger
const largerO = createCustomO(0, 30, 18, 9);
console.log("\n1. 1.5x Larger (same weight ratio):");
console.log(`Path: ${largerO}`);
console.log("Outer radius: 18, Inner radius: 9 (weight: 9)");

// 2x larger
const doubleO = createCustomO(0, 30, 24, 12);
console.log("\n2. 2x Larger (same weight ratio):");
console.log(`Path: ${doubleO}`);
console.log("Outer radius: 24, Inner radius: 12 (weight: 12)");

// 2.5x larger
const biggerO = createCustomO(0, 30, 30, 15);
console.log("\n3. 2.5x Larger (same weight ratio):");
console.log(`Path: ${biggerO}`);
console.log("Outer radius: 30, Inner radius: 15 (weight: 15)");

console.log("\n=== WEIGHT VARIATIONS (same size, different thickness) ===");

// Thicker weight - same size
const thickerO1 = createCustomO(0, 30, 12, 8);
console.log("\n1. Thicker (weight 8):");
console.log(`Path: ${thickerO1}`);
console.log("Outer radius: 12, Inner radius: 4 (weight: 8)");

// Very thick weight
const thickerO2 = createCustomO(0, 30, 12, 10);
console.log("\n2. Very Thick (weight 10):");
console.log(`Path: ${thickerO2}`);
console.log("Outer radius: 12, Inner radius: 2 (weight: 10)");

// Extra thick (almost solid)
const thickerO3 = createCustomO(0, 30, 12, 11);
console.log("\n3. Extra Thick (weight 11):");
console.log(`Path: ${thickerO3}`);
console.log("Outer radius: 12, Inner radius: 1 (weight: 11)");

console.log("\n=== COMBINED: LARGER + THICKER ===");

// Large and thick
const largethickO1 = createCustomO(0, 30, 20, 12);
console.log("\n1. Large + Thick:");
console.log(`Path: ${largethickO1}`);
console.log("Outer radius: 20, Inner radius: 8 (weight: 12)");

// Very large and thick
const largethickO2 = createCustomO(0, 30, 25, 15);
console.log("\n2. Very Large + Very Thick:");
console.log(`Path: ${largethickO2}`);
console.log("Outer radius: 25, Inner radius: 10 (weight: 15)");

// Huge and bold
const largethickO3 = createCustomO(0, 30, 35, 20);
console.log("\n3. Huge + Bold:");
console.log(`Path: ${largethickO3}`);
console.log("Outer radius: 35, Inner radius: 15 (weight: 20)");

console.log("\n=== FOR TYPESCRIPT EXPORTS ===");

console.log('\n// Larger versions');
console.log(`export const O_LARGE_PATH = "${largerO}"`);
console.log(`export const O_DOUBLE_PATH = "${doubleO}"`);
console.log(`export const O_HUGE_PATH = "${biggerO}"`);

console.log('\n// Thicker versions (same size)');
console.log(`export const O_THICK_PATH = "${thickerO1}"`);
console.log(`export const O_VERY_THICK_PATH = "${thickerO2}"`);

console.log('\n// Large + Thick combinations');
console.log(`export const O_LARGE_THICK_PATH = "${largethickO1}"`);
console.log(`export const O_HUGE_BOLD_PATH = "${largethickO3}"`);

console.log("\n=== COMPLETE SVG EXAMPLES ===");

console.log("\nLarge + Thick 'O' SVG:");
console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 80 60" width="80" height="60">
  <path d="${largethickO1}" fill="currentColor"/>
</svg>`);

console.log("\nHuge + Bold 'O' SVG:");
console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -10 100 80" width="100" height="80">
  <path d="${largethickO3}" fill="currentColor"/>
</svg>`);