/**
 * Content Migration Script
 * 
 * This script migrates the existing static blog posts from the Vite app
 * to the Supabase database.
 * 
 * Usage:
 *   1. Set up your .env.local with Supabase credentials
 *   2. Run: npx tsx scripts/migrate-posts.ts
 */

import { createClient } from "@supabase/supabase-js";

// Static blog posts from the original Vite app
const blogPosts = [
  {
    slug: "5-tips-managing-multiple-medications",
    title: "Tips for Managing Multiple Medications",
    excerpt:
      "Taking multiple medications can feel overwhelming. Here are practical strategies to stay organized and on track with your prescriptions.",
    content: `<h2>Why Medication Management Matters</h2>
<p>When you're taking multiple medications, staying organized isn't just convenient — it's essential for your health. Missing doses or taking medications incorrectly can lead to serious complications. The good news? With the right strategies, managing multiple prescriptions becomes much easier.</p>

<h2>1. Use a Pill Organizer</h2>
<p>One of the simplest ways to stay on track is using a weekly pill organizer. Sorting your medications by date and time eliminates confusion and helps ensure you never miss a dose.</p>

<h2>2. Keep an Updated Medication List</h2>
<p>Always maintain a current list of all your medications, including:</p>
<ul>
<li>Prescription medications</li>
<li>Over-the-counter drugs</li>
<li>Vitamins and supplements</li>
<li>Dosages and timing</li>
</ul>
<p>Share this list with all your healthcare providers and bring it to every appointment.</p>

<h2>3. Set Reminders</h2>
<p>Use your phone's alarm or a medication reminder app to alert you when it's time to take your medications. Consistency is key — try to take your medications at the same times each day.</p>

<h2>4. Partner With Your Pharmacist</h2>
<p>Your pharmacist is an invaluable resource. Don't hesitate to ask questions about:</p>
<ul>
<li>Potential drug interactions</li>
<li>Side effects to watch for</li>
<li>The best time to take each medication</li>
<li>Whether medications can be taken together</li>
</ul>
<p>At Mountain View Pharmacy, our pharmacists are always available to help you understand your medications and optimize your therapy.</p>

<h2>Take the Next Step</h2>
<p>Managing multiple medications doesn't have to be stressful. Contact us to learn how we can help simplify your health journey.</p>`,
    date: "2024-01-15",
    author: "Mountain View Pharmacy Team",
    category: "Health Tips",
    image: "/placeholder.svg",
    readTime: "4 min read",
  },
  {
    slug: "why-custom-compounding-might-be-right-for-you",
    title: "Why Custom Compounding Might Be Right for You",
    excerpt:
      "Discover how compounded medications can provide personalized solutions when commercial drugs don't meet your needs.",
    content: `<h2>What Is Compounding?</h2>
<p>Pharmaceutical compounding is the art and science of creating personalized medications tailored to an individual patient's specific needs. While most medications come in standard doses and forms, compounding allows pharmacists to customize medications when commercially available options aren't suitable.</p>

<h2>When Might You Need a Compounded Medication?</h2>

<h3>Allergies or Sensitivities</h3>
<p>Commercial medications often contain inactive ingredients like dyes, gluten, lactose, or preservatives. If you're allergic or sensitive to these ingredients, a compounded version can be made without them.</p>

<h3>Dosage Adjustments</h3>
<p>Sometimes the standard dose isn't right for you — perhaps you need a smaller dose for a child or a different strength than what's commercially available. Compounding allows for precise dosing.</p>

<h3>Discontinued Medications</h3>
<p>When a manufacturer stops making a medication you rely on, compounding can often recreate it so you can continue your therapy without interruption.</p>

<h3>Alternative Dosage Forms</h3>
<p>Can't swallow pills? Need a topical cream instead of an oral medication? Compounding can transform medications into:</p>
<ul>
<li>Flavored liquids</li>
<li>Topical creams or gels</li>
<li>Lozenges or troches</li>
<li>Suppositories</li>
<li>And more</li>
</ul>

<h3>Combination Medications</h3>
<p>Taking multiple medications at the same time? Compounding can sometimes combine them into a single dose, simplifying your routine.</p>

<h2>Our Compounding Capabilities</h2>
<p>At Mountain View Pharmacy, our state-of-the-art compounding lab can prepare:</p>
<ul>
<li><strong>Hormone Replacement Therapy (HRT)</strong> — Customized bioidentical hormones</li>
<li><strong>Pain Management</strong> — Topical pain creams and gels</li>
<li><strong>Dermatology</strong> — Specialized skin preparations</li>
<li><strong>Pediatric Medications</strong> — Child-friendly flavors and dosages</li>
<li><strong>Veterinary Medications</strong> — Yes, we help pets too!</li>
</ul>

<h2>Quality and Safety</h2>
<p>All our compounded medications are prepared following strict USP guidelines. Our pharmacists are specially trained in compounding techniques, and we use only pharmaceutical-grade ingredients from reputable suppliers.</p>

<h2>Is Compounding Right for You?</h2>
<p>If you've struggled with standard medications or have unique health needs, talk to your doctor about compounding. Then contact us — we'll work with your prescriber to create a medication that's made just for you.</p>`,
    date: "2024-01-08",
    author: "Mountain View Pharmacy Team",
    category: "Pharmacy Services",
    image: "/placeholder.svg",
    readTime: "5 min read",
  },
];

async function migrateContent() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables.");
    console.log("Please set:");
    console.log("  NEXT_PUBLIC_SUPABASE_URL");
    console.log("  SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log("Starting content migration...\n");

  // Migrate blog posts
  console.log("Migrating blog posts...");
  for (const post of blogPosts) {
    const postData = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      published_at: new Date(post.date).toISOString(),
      author_name: post.author,
      category: post.category,
      featured_image: post.image === "/placeholder.svg" ? null : post.image,
      read_time: post.readTime,
      status: "published" as const,
      seo_title: post.title,
      seo_description: post.excerpt,
      no_index: false,
    };

    const { error } = await supabase.from("posts").upsert(postData, {
      onConflict: "slug",
    });

    if (error) {
      console.error(`  ✗ Failed to migrate: ${post.slug}`);
      console.error(`    Error: ${error.message}`);
    } else {
      console.log(`  ✓ Migrated: ${post.slug}`);
    }
  }

  console.log("\n✓ Migration complete!");
  console.log("\nNote: The migration used the service role key to bypass RLS.");
  console.log("Make sure to create an admin user to manage content going forward.");
}

migrateContent().catch(console.error);
