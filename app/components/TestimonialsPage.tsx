import Marquee from "@/components/ui/marquee";

export const reviews = [
  {
    id: 1,
    name: "Sophie",
    username: "Stage MBSR",
    body: "J'ai participé aux stages MBSR et Auto-compassion",
  },
  {
    id: 5,
    name: "Sylvaine",
    username: "Stage autocompassion",
    body: `Je recommande vivement ce stage.`,
  },
  {
    id: 6,
    name: "Melissa",
    username: "Stage autocompassion",
    body: "Je la recommande vivement..",
  },
  {
    id: 2,
    name: "Lucas",
    username: "Perte de poids",
    body: "Je me sens mieux dans ma peau et plus en confiance.",
  },
  {
    id: 13,
    name: "Martin",
    username: "Arrêt du tabac",
    body: "Grâce à un soutien empathique.",
  },
  {
    id: 7,
    name: "Julia",
    username: "Traitement des phobies",
    body: "Un immense merci pour ce soutien précieux !",
  },
  {
    id: 16,
    name: "Olivier",
    username: "Stage autocompassion",
    body: "le lieu du vrai bonheur. Merci, Laure !",
  },
  {
    id: 8,
    name: "Jordan",
    username: "Confiance en soi",
    body: "Je recommande vivement cette expérience.",
  },
  {
    id: 9,
    name: "Alice",
    username: "Hypnose",
    body: "C'est une expérience transformante !",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  name,
  username,
  body,
}: {
  name: string;
  username: string;
  body: string;
  id: number;
}) => {
  return (
    <div className="flex flex-col gap-4 h-[150px] rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 mx-4 my-2 w-[300px] bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        {/*  <Avatar id={name} width={40} height={40} /> */}
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
  return (
    <section className="flex flex-col h-screen justify-center">
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
