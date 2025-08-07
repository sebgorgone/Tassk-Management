import { useState, useEffect } from "react";

function useViewport() {
   const [viewport, setViewport] = useState(window.innerWidth);

   useEffect(() => {
      const handleResize = () => setViewport(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return viewport;
   
}

export default useViewport;