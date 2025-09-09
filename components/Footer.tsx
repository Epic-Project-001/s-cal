export default function Footer() {
  return (
    <footer className="flex px-4 lg:px-6 xl:px-15 pt-4 text-[15px] justify-between mt-auto">
      <div>
        © {new Date().getFullYear()} Lorem Ipsum Study. All rights reserved.
      </div>
      <div>Powered by Jumo Health</div>
    </footer>
  );
}
