export default function Footer() {
  return (
    <footer className="flex flex-wrap gap-4 text-[15px] justify-between mt-auto">
      <div>
        © {new Date().getFullYear()} Entrance Study. All rights reserved.
      </div>
      <div>Powered by Jumo Health</div>
    </footer>
  );
}
