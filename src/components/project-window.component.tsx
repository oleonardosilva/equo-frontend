"use client";

import { useState } from "react";
import About from "./about.component";
import Chat from "./chat.component";

function EquoWindow() {
  type Page = "about" | "chat" | "docs";
  const [selected, setSelected] = useState<Page>("about");
  const items: { id: Page; label: string }[] = [
    {
      id: "about",
      label: "_sobre",
    },
    {
      id: "chat",
      label: "_diagnóstico",
    },
    {
      id: "docs",
      label: "_documentação",
    },
  ];

  return (
    <div className="col-span-full mt-8 mb-8 bg-black rounded-xl border-1 border-line flex flex-col">
      {/* Header Component */}
      <header className="flex flex-row border-b-1 border-line text-base">
        <div className="border-r-1 border-line w-80 flex flex-col justify-center">
          <span className="ml-4 select-none">projeto-equo</span>
        </div>

        <div className="grid grid-cols-3">
          {items.map((item, key) => {
            return (
              <button key={key} onClick={() => setSelected(item.id)}>
                <div
                  className={`relative border-r-1 border-line p-4 text-center cursor-pointer duration-200 hover:bg-btn-hover
                after:content-[''] 
                after:absolute after:left-0 after:bottom-0
                after:h-[2px] after:w-full after:bg-btn-underline
                after:origin-center after:scale-x-0 
                after:transition-transform after:duration-200
                ${selected === item.id ? "after:scale-x-100" : ""}`}
                >
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      {/* Body Component */}
      <div className="flex-1 flex flex-row">
        {/* SideBar */}
        <div className="w-80"></div>

        {/* Content */}
        <div className="flex-1">
          {selected === "about" && <About />}
          {selected === "chat" && <Chat />}
        </div>
      </div>

      {/* Footer Component */}
      <footer className="border-t-1 border-line flex flex-row justify-end">
        <div className="px-4 py-2">
          <span className="text-sm">
            &copy; 2025 IFSP Cubatão. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default EquoWindow;
