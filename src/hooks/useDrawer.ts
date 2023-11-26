import { useState } from 'react';

const useDrawer = () => {
  const [showCart, setShowCart] = useState(false);

  return { showCart, setShowCart };
};

export default useDrawer;
