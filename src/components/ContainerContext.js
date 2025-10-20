import { createContext, useContext } from '@wordpress/element';

// Context to track parent container's background color
const ContainerContext = createContext('white'); // Default to white background

export const ContainerProvider = ContainerContext.Provider;

export function useContainerContext() {
    return useContext(ContainerContext);
}