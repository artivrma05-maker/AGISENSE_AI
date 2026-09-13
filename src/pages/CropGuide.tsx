import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Bug,
  Droplets,
  Sun,
  ChevronDown,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

type Crop = {
  name: string;
  icon: string;
  description: string;
  diseases: string[];
  care: string;
  prevention: string;
  soil: string;
  irrigation: string;
  fertilizer: string;
  season: string;
};

const crops: Crop[] = [
  {
    name: "Tomato",
    icon: "🍅",
    description:
      "Tomato is a widely grown vegetable crop that requires proper watering, sunlight and regular disease monitoring.",
    diseases: [
      "Late Blight",
      "Early Blight",
      "Bacterial Spot",
      "Leaf Mold",
      "Septoria Leaf Spot",
      "Tomato Yellow Leaf Curl Virus",
    ],
    care:
      "Provide adequate sunlight, maintain proper spacing, water near the soil and avoid keeping leaves wet for long periods.",
    prevention:
      "Inspect leaves regularly, remove infected plant material, maintain good air circulation and keep the growing area clean.",
          soil: "Well-drained loamy soil rich in organic matter.",
    irrigation: "Water regularly at the soil level. Avoid overwatering and prolonged leaf wetness.",
    fertilizer: "Use balanced fertilizer with adequate nitrogen, phosphorus and potassium according to crop growth stage.",
    season: "Best grown in warm conditions. In North India, suitable seasons generally include summer and winter crop periods.",
  },
  {
    name: "Potato",
    icon: "🥔",
    description:
      "Potato is a cool-season crop that benefits from well-drained soil and consistent crop monitoring.",
    diseases: [
      "Early Blight",
      "Late Blight",
      "Bacterial Wilt",
    ],
    care:
      "Maintain proper soil moisture, provide good drainage and avoid unnecessary leaf wetness.",
    prevention:
      "Use healthy planting material, remove diseased plants and maintain proper field sanitation.",
          soil: "Well-drained, fertile loamy or sandy-loam soil.",
    irrigation: "Maintain consistent soil moisture, especially during tuber development. Avoid waterlogging.",
    fertilizer: "Use balanced fertilizer with suitable nitrogen, phosphorus and potassium based on soil and crop requirements.",
    season: "Potato is mainly grown as a cool-season crop. In North India, winter is the major growing season.",
  },
  {
    name: "Apple",
    icon: "🍎",
    description:
      "Apple trees need regular monitoring because fungal and bacterial diseases can affect leaves and fruits.",
    diseases: [
      "Apple Scab",
      "Black Rot",
      "Cedar Apple Rust",
    ],
    care:
      "Maintain good sunlight and air circulation around the tree and remove fallen infected leaves.",
    prevention:
      "Keep the orchard clean, prune overcrowded branches and regularly inspect leaves and fruits.",
          soil: "Well-drained, fertile loamy soil with good organic matter.",
    irrigation: "Provide regular watering during dry periods, while avoiding waterlogging around the roots.",
    fertilizer: "Apply balanced nutrients based on tree age, soil condition and growth requirements.",
    season: "Apple is a cool-climate fruit crop and performs best in suitable temperate conditions.",
  },
  {
    name: "Corn",
    icon: "🌽",
    description:
      "Corn requires adequate sunlight, nutrients and sufficient moisture throughout its growth cycle.",
    diseases: [
      "Common Rust",
      "Northern Leaf Blight",
      "Cercospora Leaf Spot",
    ],
    care:
      "Maintain proper spacing, provide balanced nutrition and avoid prolonged water stress.",
    prevention:
      "Use healthy seeds, rotate crops where appropriate and regularly monitor leaves for disease symptoms.",
          soil: "Well-drained fertile loamy soil with good moisture-holding capacity.",
    irrigation: "Provide adequate water during important growth stages and avoid prolonged water stress.",
    fertilizer: "Use nitrogen, phosphorus and potassium according to soil condition and crop growth stage.",
    season: "Corn grows well in warm conditions with adequate sunlight and moisture.",
  },
];

export default function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState<Crop>(crops[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Crop Guide"
        subtitle="Learn about crops, diseases and basic care"
      />

      <div className="px-4 space-y-5">

        {/* Crop Selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {selectedCrop.icon}
              </span>

              <div className="text-left">
                <p className="text-xs text-muted-foreground">
                  Selected Crop
                </p>

                <p className="font-bold">
                  {selectedCrop.name}
                </p>
              </div>
            </div>

            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-full rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              {crops.map((crop) => (
                <button
                  key={crop.name}
                  onClick={() => {
                    setSelectedCrop(crop);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 hover:bg-muted text-left"
                >
                  <span className="text-2xl">
                    {crop.icon}
                  </span>

                  <span className="font-medium">
                    {crop.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          key={selectedCrop.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >

          {/* Crop Overview */}
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20 p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                {selectedCrop.icon}
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Crop Guide
                </p>

                <h2 className="text-2xl font-bold">
                  {selectedCrop.name}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-6">
              {selectedCrop.description}
            </p>
          </div>
          {/* Soil Information */}
<div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
      <Leaf className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-bold">Soil Requirement</h3>
      <p className="text-xs text-muted-foreground">
        Suitable soil for this crop
      </p>
    </div>
  </div>

  <p className="text-sm text-muted-foreground leading-7">
    {selectedCrop.soil}
  </p>
</div>
{/* Irrigation */}
<div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
      <Droplets className="w-5 h-5 text-blue-500" />
    </div>
    <div>
      <h3 className="font-bold">Irrigation</h3>
      <p className="text-xs text-muted-foreground">
        Watering guidance
      </p>
    </div>
  </div>

  <p className="text-sm text-muted-foreground leading-7">
    {selectedCrop.irrigation}
  </p>
</div>
{/* Fertilizer */}
<div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
      <Leaf className="w-5 h-5 text-yellow-600" />
    </div>

    <div>
      <h3 className="font-bold">Fertilizer</h3>
      <p className="text-xs text-muted-foreground">
        Nutrient guidance
      </p>
    </div>
  </div>

  <p className="text-sm text-muted-foreground leading-7">
    {selectedCrop.fertilizer}
  </p>
</div>
{/* Growing Season */}
<div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
      <Sun className="w-5 h-5 text-orange-500" />
    </div>

    <div>
      <h3 className="font-bold">Growing Season</h3>
      <p className="text-xs text-muted-foreground">
        Suitable growing conditions
      </p>
    </div>
  </div>

  <p className="text-sm text-muted-foreground leading-7">
    {selectedCrop.season}
  </p>
</div>

          {/* Common Diseases */}
          <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <Bug className="w-5 h-5 text-destructive" />
              </div>

              <div>
                <h3 className="font-bold">
                  Common Diseases
                </h3>

                <p className="text-xs text-muted-foreground">
                  Diseases to watch for
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedCrop.diseases.map((disease) => (
                <span
                  key={disease}
                  className="px-3 py-2 rounded-xl bg-muted text-sm font-medium"
                >
                  {disease}
                </span>
              ))}
            </div>
          </div>

          {/* Basic Care */}
          <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="font-bold">
                  Basic Care
                </h3>

                <p className="text-xs text-muted-foreground">
                  Keep your crop healthy
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Droplets className="w-5 h-5 text-primary shrink-0 mt-1" />

              <p className="text-sm text-muted-foreground leading-7">
                {selectedCrop.care}
              </p>
            </div>
          </div>

          {/* Prevention */}
          <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>

              <div>
                <h3 className="font-bold">
                  Prevention
                </h3>

                <p className="text-xs text-muted-foreground">
                  Prevent common crop problems
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Sun className="w-5 h-5 text-blue-500 shrink-0 mt-1" />

              <p className="text-sm text-muted-foreground leading-7">
                {selectedCrop.prevention}
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}