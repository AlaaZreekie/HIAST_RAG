"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { ChevronDown, Search, Globe, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      title: "الرئيسية",
      submenu: [
        { title: "هندسة البرمجيات والذكاء الصنعي", href: "/software-ai" },
        { title: "هندسة الشبكات ونظم التشغيل", href: "/networks" },
        { title: "هندسة النظم الإلكترونية", href: "/electronics" },
        { title: "هندسة الميكاترونيكس", href: "/mechatronics" },
      ],
    },
    {
      title: "الدراسة في المعهد",
      submenu: [
        { title: "التأهيل الهندسي", href: "/engineering" },
        { title: "الدراسات العليا", href: "/postgraduate" },
        { title: "قبول الطلاب", href: "/admission" },
      ],
    },
    {
      title: "أقسام المعهد",
      submenu: [
        { title: "هندسة البرمجيات والذكاء الصنعي", href: "/software-ai" },
        { title: "هندسة الشبكات ونظم التشغيل", href: "/networks" },
        { title: "هندسة النظم الإلكترونية", href: "/electronics" },
        { title: "هندسة الميكاترونيكس", href: "/mechatronics" },
      ],
    },
    {
      title: "البحث والتطوير",
      submenu: [
        { title: "هندسة البرمجيات والذكاء الصنعي", href: "/software-ai" },
        { title: "هندسة الشبكات ونظم التشغيل", href: "/networks" },
        { title: "هندسة النظم الإلكترونية", href: "/electronics" },
        { title: "هندسة الميكاترونيكس", href: "/mechatronics" },
      ],
    },

    {
      title: "الحياة الطلابية",
      submenu: [
        { title: "هندسة البرمجيات والذكاء الصنعي", href: "/software-ai" },
        { title: "هندسة الشبكات ونظم التشغيل", href: "/networks" },
        { title: "هندسة النظم الإلكترونية", href: "/electronics" },
        { title: "هندسة الميكاترونيكس", href: "/mechatronics" },
      ],
    },

    {
      title: "المكتبة الرقمية",
      submenu: [
        { title: "هندسة البرمجيات والذكاء الصنعي", href: "/software-ai" },
        { title: "هندسة الشبكات ونظم التشغيل", href: "/networks" },
        { title: "هندسة النظم الإلكترونية", href: "/electronics" },
        { title: "هندسة الميكاترونيكس", href: "/mechatronics" },
      ],
    },

    {
      title: "النشرات العملية",
    },
  ];

  return (
    <header className="bg-background border-b shadow-sm">
      {/* Top Header */}
      <div className="bg-gradient-primary-reverse text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 rtl">
            <span>🇸🇾 المعهد العالي للعلوم التطبيقية والتكنولوجيا</span>
          </div>
          <div className="flex items-center gap-4">
            <Button className="flex items-center justify-between">
              AR
              <Globe className="h-4 w-4 mr-1" />
            </Button>
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 rtl">
            <img
              src={"/hiast-logo.jpg"}
              alt="HIAST Logo"
              className="h-16 w-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">
                المعهد العالي للعلوم التطبيقية والتكنولوجيا
              </h1>
              <p className="text-sm text-muted-foreground">
                Higher Institute for Applied Sciences and Technology
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`mt-4 mr-4 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex lg:items-center gap-4 sm:flex-col lg:flex-row">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Button className="rounded w-full lg:w-auto justify-start lg:justify-center flex-row hover:bg-accent/50 hover:cursor-pointer text-foreground flex p-2">
                {item.title}
                {item.submenu && (
                  <ChevronDown className="h-4 w-4 mr-2 sm:opacity-0 lg:opacity-100" />
                )}
              </Button>

              {/* Submenu */}
              {item.submenu && (
                <Card className="bg-background absolute right-0 top-full mt-1 w-64 p-2 shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        className="w-full justify-start text-right text-sm hover:bg-accent/50 hover:cursor-pointer p-2 rounded"
                      >
                        {subItem.title}
                      </Button>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
