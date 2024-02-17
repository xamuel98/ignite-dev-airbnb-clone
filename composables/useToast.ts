import useGenerators from '~/utils/generators';
import { computed, ref } from "vue";
import type { Toast } from "~/types/toast";


let toastList = ref<Toast[]>([]);

const { generateUniqueId } = useGenerators();

export const useToast = () => {
    const setToast = (toast: Toast) => {
        return (toastList.value = [...toastList.value, toast]);
    };

    const createToast = (type: string, description: string, duration: number = 5000) => {
        const newToast = {
            id: generateUniqueId(10, 'toast'),
            type,
            description,
            duration,
        };
        return setToast(newToast);
    };

    const removeToast = (id: string) => {
        return (toastList.value = toastList.value.filter((toast) => id !== toast.id));
    };

    const clearToastList = () => {
        return (toastList.value = []);
    };

    return {
        createToast,
        removeToast,
        clearToastList,
        toastList: computed(() => toastList.value),
    };
};

export default useToast;