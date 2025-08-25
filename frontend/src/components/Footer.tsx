export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white fixed bottom-0 left-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} Library System. All rights reserved.
        </div>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-200">Privacy Policy</a>
          <a href="#" className="hover:text-gray-200">Terms of Service</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}
