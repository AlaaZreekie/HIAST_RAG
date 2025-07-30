"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getAllPrograms, getProgramNameInLanguage } from "@/lib/programsApi";
import { getAllLocations, getLocationNameInLanguage } from "@/lib/locationsApi";

const CreateSpecializationForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [programs, setPrograms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load programs and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        const [programsData, locationsData] = await Promise.all([
          getAllPrograms(),
          getAllLocations()
        ]);
        setPrograms(programsData);
        setLocations(locationsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      if (initialData.Translations) {
        const arabicTranslation = initialData.Translations.find(t => t.LanguageCode === 1);
        const englishTranslation = initialData.Translations.find(t => t.LanguageCode === 2);
        
        if (arabicTranslation) {
          setArabicName(arabicTranslation.Name || "");
        }
        if (englishTranslation) {
          setEnglishName(englishTranslation.Name || "");
        }
      }
      
      // Set program and location
      if (initialData.ProgramId) {
        setSelectedProgramId(initialData.ProgramId);
      }
      if (initialData.LocationId) {
        setSelectedLocationId(initialData.LocationId);
      }
    }
  }, [initialData, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!arabicName.trim() && !englishName.trim()) {
      alert(t("specializations.form.nameRequired"));
      return;
    }

    const specializationData = {
      Translations: [],
      ProgramId: selectedProgramId,
      LocationId: selectedLocationId
    };

    if (arabicName.trim()) {
      specializationData.Translations.push({
        LanguageCode: 1,
        Name: arabicName.trim()
      });
    }

    if (englishName.trim()) {
      specializationData.Translations.push({
        LanguageCode: 2,
        Name: englishName.trim()
      });
    }

    if (isEditMode && initialData) {
      specializationData.Id = initialData.Id;
    }

    onSubmit(specializationData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Arabic Name */}
            <div>
              <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("specializations.form.name")} ({t("specializations.arabic")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="arabicName"
                  value={arabicName}
                  onChange={(e) => setArabicName(e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("specializations.form.namePlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("specializations.form.name")} ({t("specializations.english")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="englishName"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("specializations.form.namePlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <label htmlFor="program" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("specializations.form.program")}
              </label>
              <div className="mt-1">
                <select
                  id="program"
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  size="3"
                >
                  <option value="">{t("specializations.form.selectProgram")}</option>
                  {programs.map((program) => (
                    <option key={program.Id} value={program.Id}>
                      {getProgramNameInLanguage(program, lang === "ar" ? 1 : 2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <label htmlFor="location" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("specializations.form.location")}
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  size="3"
                >
                  <option value="">{t("specializations.form.selectLocation")}</option>
                  {locations.map((location) => (
                    <option key={location.Id} value={location.Id}>
                      {getLocationNameInLanguage(location, lang === "ar" ? 1 : 2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/specializations")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("specializations.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading || loadingData}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("specializations.form.update") : t("specializations.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("specializations.form.update") : t("specializations.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSpecializationForm; 