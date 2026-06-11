import Link from "next/link";
import { projects } from "@/data/projects";
import {blogs} from "@/data/blog";    
export default async function ProjectPage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

const project = projects.find(
(item) => item.slug === slug
);

if (!project) {
return ( <div className="min-h-screen flex items-center justify-center"> <h1 className="text-4xl font-bold text-red-500">
Project Not Found </h1> </div>
);
}

return ( <section className="min-h-screen bg-gray-50 py-16"> <div className="max-w-6xl mx-auto px-4">

    <Link
      href="/view-work"
      className="text-indigo-600 hover:underline mb-8 inline-block"
    >
      ← Back to Projects
    </Link>

    <img
      src={project.image}
      alt={project.name}
      className="w-full h-[400px] rounded-3xl object-cover mb-8"
    />

    <h1 className="text-4xl font-bold mb-4">
      {project.name}
    </h1>

    <p className="text-gray-600 text-lg mb-8">
      {project.description}
    </p>

    {/* Technologies */}
    <div className="bg-white p-6 rounded-3xl shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Technologies Used
      </h2>

      <div className="flex gap-3 flex-wrap">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Pricing */}
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Pricing Packages
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {project.packages.map((pkg) => (
          <div
            key={pkg.name}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold">
              {pkg.name}
            </h3>

            <p className="text-gray-500 mt-2 mb-4">
              {pkg.description}
            </p>

            <h4 className="text-4xl font-bold text-indigo-600 mb-5">
              {pkg.price}
            </h4>

            <ul className="space-y-3">
              {pkg.features.map(
                (feature, index) => (
                  <li key={index}>
                    ✅ {feature}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonial */}
    <div className="bg-white p-8 rounded-3xl shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Client Testimonial
      </h2>

      <p className="italic text-gray-600">
        "{project.testimonial.review}"
      </p>

      <h4 className="font-semibold mt-4">
        — {project.testimonial.name}
      </h4>
    </div>

    {/* Live Website */}
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-indigo-600 text-white px-6 py-3 rounded-xl inline-block"
    >
      🔗 View Live Website
    </a>
  </div>
</section>

);
}
