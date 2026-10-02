import { business } from "../../config/business";

export function Footer() {
  return (
    <footer className="bg-brand py-10 text-white">
      <div className="container-custom">
        <div>
          <p className="text-xl font-bold tracking-[0.12em]">
            {business.brandName}
          </p>

          <p className="mt-1 text-sm text-white/70">
            {business.category}
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}