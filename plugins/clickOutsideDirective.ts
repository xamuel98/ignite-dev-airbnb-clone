/**
 * @author Sanni Samuel
 * @description Directive Plugin to close a dropdown/modal when the outside is clicked
 */
export default defineNuxtPlugin((nuxtApp) => {
    console.info('Click-Outside Plugin Load...');

    nuxtApp.vueApp.directive('click-outside', {
        mounted(el, binding) {
            const closeDropdown = (event: MouseEvent) => {
                if (binding.value) {
                    binding.value(event);
                }
            };
        
            const handleClickOutside = (event: MouseEvent) => {
                // Check if the clicked element is outside the target element
                if (!el.contains(event.target) && el !== event.target) {
                    closeDropdown(event);
                }
            };
        
            document.addEventListener('click', handleClickOutside);
        
            // Store the event listener function for cleanup during unmount
            el._clickOutsideHandler = handleClickOutside;
          },
          unmounted(el) {
            // Remove the event listener during unmount
            document.removeEventListener('click', el._clickOutsideHandler);
            delete el._clickOutsideHandler;
        }
    })
});