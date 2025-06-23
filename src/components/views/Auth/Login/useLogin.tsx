import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("please input your email or password"),
  password: yup.string().min(8, "Minimal 8 Characters").required("please input your Password"),
});

const useLogin = () => {
    const router = useRouter();
    const callbackUrl = (router.query.callbackUrl as string) || "/"; // ✅ Dipindah ke sini

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        });

        if (result?.error && result?.status === 401) {
            throw new Error("Email or Username not match with your password");
        }

        return result;
    };

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError(error) {
            setError("root", {
                message: error.message,
            });
        },
        onSuccess: () => {
            router.push(callbackUrl);
            reset();
        },
    });

    const handleLogin = (data: ILogin) => mutateLogin(data);

    return {
        isVisible,
        toggleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    };
};

export default useLogin;
