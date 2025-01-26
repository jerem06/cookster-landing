import React from "react";
import Image from "next/image";
import laCuisineDuJ from "@/app/assets/images/laCuisineDuJ.jpg";
import placeholder1 from "@/app/assets/images/placeholderChef1.jpg";
import placeholder2 from "@/app/assets/images/placeholderChef2.jpg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jean Bon",
    role: "Peut être vous ?",
    image: placeholder1.src,
  },
  {
    name: "LaCuisineDuJ",
    role: `"Moins de gluten plus de fun."`,
    image: laCuisineDuJ.src,
  },
  {
    name: "Anna Nass",
    role: "Peut être vous ?",
    image: placeholder2.src,
  },
  {
    name: "Sam Oussa",
    role: "Peut être vous ?",
    image: placeholder1.src,
  },
  {
    name: "Léa Zagne",
    role: "Peut être vous ?",
    image: placeholder2.src,
  },

  // Add more team members as needed
];

const TeamPage: React.FC = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Des créateurs passionnés
          </h2>
          <p className="text-lg text-gray-600">
            Chez Cookster, nous unissons nos forces avec des tops créateurs food
            pour inspirer, régaler et accompagner nos utilisateurs dans leur
            aventure culinaire.
          </p>
        </div>

        {/* Team Members Scroll Section */}
        <div className="relative w-full">
          <div className="flex overflow-x-auto gap-6 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-8 snap-x snap-mandatory pt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex-none w-[280px] snap-center">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-[320px] w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 280px) 100vw, 280px"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
