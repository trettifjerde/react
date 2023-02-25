import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRedirectOnLogout = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.general.user);
    const [hasBeenAuthed, setHasBeenAuthed] = useState(!!user);

    useEffect(() => {
        console.log('inside auto logout');
        if (user && !hasBeenAuthed) 
            setHasBeenAuthed(true);
        else if (!user && hasBeenAuthed)
            navigate('/recipes');
    }, [user, hasBeenAuthed, navigate, setHasBeenAuthed]);

    return null;
}

export default useRedirectOnLogout;