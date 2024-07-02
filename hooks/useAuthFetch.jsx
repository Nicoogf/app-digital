import { useRouter } from "next/router";

export function useAuthFetch() {
    const router = useRouter()
    const authRouter = async({
        endpoint,
        formData,
        redirectRoute,
        options}) => {
            try {
                const { data } = await axios.post(`/api/auth/${endpoint}`, formData,options )

                if(redirectRoute) router.push(redirectRoute)
            } catch (error) {
                
            }
    }

    return authRouter
}