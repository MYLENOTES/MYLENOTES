'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase.config";

interface UidContextType {
    uid: string | null;
}

const UidContext = createContext<UidContextType>({ uid: null });

export const UidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uid, setUid] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                const userId = user.uid; 
                setUid(userId);
            } else {
                setUid(null);
            }
        });
        return () => unsubscribe();
    }, []);

    

    return (
        <UidContext.Provider value={{ uid }}>
            {children}
        </UidContext.Provider>
    );
    
};

export const useUid = (): UidContextType => useContext(UidContext); // Changed function name to useUid for clarity
