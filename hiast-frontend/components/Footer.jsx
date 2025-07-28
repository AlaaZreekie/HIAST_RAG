"use client";

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "معلومات",
      links: [
        { title: "عن المعهد", href: "/about" },
        { title: "الرؤية والرسالة", href: "/vision" },
        { title: "هيكلية المعهد", href: "/structure" },
        { title: "الأخبار", href: "/news" },
      ],
    },
    {
      title: "الدراسة",
      links: [
        { title: "التأهيل الهندسي", href: "/engineering" },
        { title: "الدراسات العليا", href: "/postgraduate" },
        { title: "الدورات التدريبية", href: "/courses" },
        { title: "قبول الطلاب", href: "/admission" },
      ],
    },
    {
      title: "الخدمات",
      links: [
        { title: "التوثق من الشهادات", href: "/authentication" },
        { title: "المكتبة الرقمية", href: "/library" },
        { title: "البحث العلمي", href: "/research" },
        { title: "الاستشارات", href: "/consulting" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-16 text-right">
      <div className="container px-4 py-12">
        <div dir="ltr" className="grid lg:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                المعهد العالي للعلوم التطبيقية والتكنولوجيا
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                مؤسسة أكاديمية رائدة تهدف إلى إعداد الكوادر التقنية المتخصصة في
                مجالات العلوم التطبيقية والتكنولوجيا المتقدمة.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-row-reverse">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-sm">دمشق، سوريا - منطقة برزة</span>
              </div>
              <div className="flex items-center gap-3 flex-row-reverse">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-sm" dir="ltr">
                  +963 11 123 4567
                </span>
              </div>
              <div className="flex items-center gap-3 flex-row-reverse">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-sm">info@hiast.edu.sy</span>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <Button className="text-primary-foreground hover:bg-primary-glow/20 hover:cursor-pointer p-2 hover:text-accent-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-glow/20 hover:cursor-pointer p-2 hover:text-accent-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-glow/20 hover:cursor-pointer p-2 hover:text-accent-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-xl text-right font-semibold text-secondary ">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-glow/20 p-0 h-auto font-normal text-right w-full justify-start">
                      {link.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-glow/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <div className="rtl">
              <p>
                © 2025 المعهد العالي للعلوم التطبيقية والتكنولوجيا. جميع الحقوق
                محفوظة.
              </p>
            </div>
            <div className="flex gap-6">
              <Button
                variant="ghost"
                className="text-primary-foreground/60 hover:text-secondary p-0 h-auto text-sm"
              >
                سياسة الخصوصية
              </Button>
              <Button
                variant="ghost"
                className="text-primary-foreground/60 hover:text-secondary p-0 h-auto text-sm"
              >
                شروط الاستخدام
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
