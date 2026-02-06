import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blueDeep text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">StrataBoost</h3>
            <p className="text-sm leading-relaxed">
              Helping apartment communities fund essential building repairs —
              transparently, collectively, and without financial gymnastics.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/fundraisers" className="hover:text-white transition">
                  Browse fundraisers
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-white transition">
                  Start a fundraiser
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-white transition"
                >
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              About
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About StrataBoost
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-white/60">
            © {new Date().getFullYear()} StrataBoost. Built for communities, not
            corporations.
          </p>

          <p className="text-white/40">Made with care in Australia 🇦🇺</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
