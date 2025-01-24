import Iphone15Pro from "@/components/ui/iphone-15-pro";
import React from "react";

import google from "@/app/assets/images/google-black.png";
import apple from "@/app/assets/icons/apple-black.svg";
import AvatarCircles from "@/components/ui/avatar-circles";
import { StarIcon } from "@heroicons/react/20/solid";
import StoreNotificationDialog from "@/components/store-notification-dialog";
import ReactCookieBot from "react-cookiebot";

const domainGroupId = "63815afd-df0a-4371-bc74-784b694c4425";

const HomePage: React.FC = () => {
  const avatars = [
    {
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=felix",
    },
    {
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=aneka",
    },
    {
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=bella",
    },
    {
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=charlie",
    },
    {
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=david",
    },
  ];

  return (
    <section id="home" className="container mx-auto px-14 py-12 mt-16">
      <ReactCookieBot domainGroupId={domainGroupId} language="FR" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 ">
          <div className="h-full flex flex-col justify-around">
            <div>
              <h1 className="text-6xl font-bold mb-4">
                Cuisinez et profitez,{" "}
                <span className="gradient-text">Cookster</span> s&apos;occupe du
                reste.
              </h1>
              <h2 className="text-4xl mb-6 max-w-2xl">
                Centralisez vos recettes, planifiez vos repas, et simplifiez vos
                courses en un clic.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-6">
                <div className="flex gap-8 justify-center lg:justify-normal order-2 md:order-1">
                  <StoreNotificationDialog
                    storeName="App Store"
                    storeImage={apple}
                    imageAlt="Télécharger sur l'App Store"
                  />
                  <StoreNotificationDialog
                    storeName="Google Play"
                    storeImage={google}
                    imageAlt="Disponible sur Google Play"
                  />
                </div>

                <div className="gap-6 flex flex-col md:flex-row items-center order-1 md:order-2">
                  <AvatarCircles avatarUrls={avatars} numPeople={10} />
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className="h-5 w-5 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">
                      10+ utilisateurs cuisinent avec Cookster
                    </p>
                  </div>
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
