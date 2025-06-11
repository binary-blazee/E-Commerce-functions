function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="text-center h-[10vh] flex justify-center items-center bg-gray-800 text-white">
      <p>{year} Inc, All rights reserved</p>
    </div>
  );
}

export default Footer;
