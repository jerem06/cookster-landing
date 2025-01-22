"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Marquee from "@/components/ui/marquee";
import { useGetUserCount } from "@/services/api/useGetUserCount";

export const reviews = [
  {
    id: 1,
    name: "Marie D.",
    username: "Planification des repas",
    body: "Cookster a transformé ma façon de planifier mes repas. J'économise du temps et mes menus sont plus équilibrés !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Marie",
  },
  {
    id: 2,
    name: "Thibault L.",
    username: "Liste de courses",
    body: "La liste de courses automatique est géniale. Plus besoin de me casser la tête, tout est prêt en quelques clics !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Thibault",
  },
  {
    id: 3,
    name: "Sophie M.",
    username: "Découverte culinaire",
    body: "Les recettes sont variées et faciles à suivre. J'ai découvert plein de nouvelles saveurs vegan !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sophie",
  },
  {
    id: 4,
    name: "Lucas V.",
    username: "Suivi nutritionnel",
    body: "Le suivi des macros m'aide à atteindre mes objectifs fitness tout en me régalant.",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Lucas",
  },
  {
    id: 5,
    name: "Claire T.",
    username: "Organisation familiale",
    body: "Un vrai gain de temps pour gérer les repas de toute la famille. La planification est super simple !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Claire",
  },
  {
    id: 6,
    name: "Julien B.",
    username: "Débutant en cuisine",
    body: "Une app simple et intuitive, parfaite pour les débutants comme moi !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Julien",
  },
  {
    id: 7,
    name: "Anaïs G.",
    username: "Partage de recettes",
    body: "J'adore pouvoir partager mes recettes avec ma famille. L'option traduction est un vrai plus !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Anais",
  },
  {
    id: 8,
    name: "Marc P.",
    username: "Alimentation saine",
    body: "Grâce à Cookster, je mange plus sainement et je gère mieux mes repas au quotidien.",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Marc",
  },
  {
    id: 9,
    name: "Élodie C.",
    username: "Régimes spéciaux",
    body: "Parfait pour gérer mes recettes sans gluten. Les menus hebdomadaires sont super pratiques !",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Elodie",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  name,
  username,
  body,
  avatar,
}: {
  name: string;
  username: string;
  body: string;
  avatar: string;
}) => {
  return (
    <div className="flex flex-col gap-4 h-[200px] rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 mx-4 my-2 w-[300px] bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <Avatar className="bg-primary">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-zinc-900 dark:text-zinc-100">
            {name}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {username}
          </div>
        </div>
      </div>
      <div className="text-zinc-500 dark:text-zinc-400">{body}</div>
    </div>
  );
};

const TestimonialsPage: React.FC = () => {
  const { data: userCount = 10 } = useGetUserCount();
  return (
    <section
      id="testimonials"
      className="flex flex-col lg:h-screen justify-center"
    >
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          <span className="gradient-text">{userCount}</span> utilisateurs
          utilsent Cookster quotidiennement
        </h2>
        <h3 className="text-xl font-semibold text-gray-600">
          Ce qu&apos;ils disent de Cookster
        </h3>
      </div>

      <div className="relative flex flex-col w-full items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#0a0a0a]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#0a0a0a]"></div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
