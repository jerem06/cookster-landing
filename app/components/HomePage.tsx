import Iphone15Pro from "@/components/ui/iphone-15-pro";
import React from "react";
import Image from "next/image";
import google from "@/app/assets/images/google-black.png";
import apple from "@/app/assets/icons/apple-black.svg";
import AvatarCircles from "@/components/ui/avatar-circles";
import { StarIcon } from "@heroicons/react/20/solid";

const HomePage: React.FC = () => {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="h-full flex flex-col justify-around">
            <div>
              <h1 className="text-6xl font-bold mb-4">
                Cuisinez et profitez,{" "}
                <span className="gradient-text">Cookster</span> s&apos;occupe du
                reste.
              </h1>
              <h2 className="text-4xl mb-6">
                Centralisez vos recettes, planifiez vos repas, et simplifiez vos
                courses en un clic.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-8">
                <button className="relative h-14 w-[180px]">
                  <Image
                    src={apple}
                    alt="Télécharger sur l'App Store"
                    fill
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </button>
                <button className="relative h-14 w-[180px]">
                  <Image
                    src={google}
                    alt="Disponible sur Google Play"
                    fill
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </button>
              </div>

              <div className="gap-6 flex flex-row items-center">
                <AvatarCircles avatarUrls={avatars} numPeople={99} />
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className="h-5 w-5 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-gray-700 font-medium">4.9</span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Rejoignez plus de 45 cuisiniers passionnés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="relative flex justify-center items-center">
            <Iphone15Pro
              className="size-2/3 rotate-6"
              src="https://via.placeholder.com/430x880"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;