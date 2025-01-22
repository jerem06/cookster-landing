import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";


type NewsletterParams = {
    email: string;
    recaptchaToken: string;
};

const subscribeToNewsletter = async ({ email, recaptchaToken }: NewsletterParams) => {
    const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, recaptchaToken }),
    });

    if (!response.ok) {
        throw new Error('Newsletter subscription failed');
    }

    return true;
};

export const useNewsletterSubscription = ({
    onSuccess,
}: {
    onSuccess?: () => void;
} = {}) => {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: subscribeToNewsletter,
        onError: (error) => {
            console.error("Newsletter subscription failed:", error);
        },
        onSuccess: () => {
            console.log("Newsletter subscription successful");
            onSuccess?.();
            toast({
                title: "Succès",
                description: "Merci pour votre inscription !",
            });
        },
    });

    return mutation;
};
