"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as LevelTabs, TabsList as LevelTabsList, TabsTrigger as LevelTabsTrigger, TabsContent as LevelTabsContent } from "@/components/ui/tabs";
import { testPapers } from "../../data/testPapers";

export default function FreeTestPapers() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedPaperPath, setSelectedPaperPath] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Function to extract analytics from paper path and title
  const extractPaperInfo = (paperPath, paperTitle) => {
    const pathParts = paperPath.split('.');
    const level = pathParts[0];
    const subject = pathParts[2];
    
    // Extract year from title
    const yearMatch = paperTitle.match(/(\d{4})/);
    const year = yearMatch ? yearMatch[1] : '2024';
    
    return { level, subject, year };
  };

  const handleDownload = (paper, paperPath) => {
    setSelectedPaper(paper);
    setSelectedPaperPath(paperPath);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Extract analytics info
      const { level, subject, year } = extractPaperInfo(selectedPaperPath, selectedPaper.title);

      const response = await fetch('/api/test-paper-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone,
          subject,
          year,
          level
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Thank you! Your download will begin shortly.');
      setShowModal(false);
      setEmail("");
      setPhone("");
      
      // Trigger the actual file download
      if (selectedPaper?.downloadUrl) {
        window.open(selectedPaper.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Make sure you fill in both email and contact number!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Level Filter Menu */}
        <div className="flex justify-center mb-8">
          <LevelTabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full max-w-md">
            <LevelTabsList className="flex gap-1 bg-gray-100 rounded-2xl p-1 shadow-sm w-full">
              {["all", "primary", "secondary", "jc"].map((level) => (
                <LevelTabsTrigger
                  key={level}
                  value={level}
                  className={`
                    flex-1 px-6 py-2 rounded-xl transition
                    data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                    data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                  `}
                >
                  {level === "all"
                    ? "All"
                    : level === "jc"
                      ? "JC"
                      : level.charAt(0).toUpperCase() + level.slice(1)}
                </LevelTabsTrigger>
              ))}
            </LevelTabsList>
          </LevelTabs>
        </div>

        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-blue-800">Free Test Papers</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Access our collection of carefully curated test papers for PSLE, O Level, and A Level subjects. Perfect for practice and revision.
          </p>
        </section>

        {/* Test Papers Section */}
        <section className="space-y-8">
          {/* Primary Papers */}
          {(selectedLevel === "all" || selectedLevel === "primary") && (
            <>
              <div>
                <h3 className="text-xl font-bold text-emerald-700 mb-4">Primary Five (P5) Free Exam Papers</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Primary 5 English</h4>
                      <Tabs defaultValue="wa1" className="w-full">
                        <TabsList className="inline-flex gap-1 bg-gray-100 rounded-2xl p-1 shadow-sm mb-4">
                          <TabsTrigger
                            value="wa1"
                            className={`
                              px-6 py-2 rounded-xl transition font-bold uppercase
                              data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                              data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                            `}
                          >
                            WA1
                          </TabsTrigger>
                          <TabsTrigger
                            value="sa2"
                            className={`
                              px-6 py-2 rounded-xl transition font-bold uppercase
                              data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                              data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                            `}
                          >
                            SA2
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="wa1">
                          <ul className="space-y-4 text-sm text-black-600">
                            {testPapers.primary.p5.english.wa1.map((paper, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span>{paper.title}</span>
                                <Button 
                                  variant="link" 
                                  className="text-emerald-600 hover:text-emerald-700"
                                  onClick={() => handleDownload(paper, "primary.p5.english.wa1")}
                                >
                                  Download
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="sa2">
                          <ul className="space-y-4 text-sm text-black-600">
                            {testPapers.primary.p5.english.sa2.map((paper, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span>{paper.title}</span>
                                <Button 
                                  variant="link" 
                                  className="text-emerald-600 hover:text-emerald-700"
                                  onClick={() => handleDownload(paper, "primary.p5.english.sa2")}
                                >
                                  Download
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Primary 6 Papers */}
              <div>
                <h3 className="text-xl font-bold text-emerald-700 mb-4">Primary Six (P6) Free Exam Papers</h3>
                <div className="grid grid-cols-1 gap-10">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Primary 6 English</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.primary.p6.english.sa2.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-emerald-600 hover:text-emerald-700"
                              onClick={() => handleDownload(paper, "primary.p6.english.sa2")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {/* Primary 6 Math Papers */}
                  {testPapers.primary.p6.math && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Primary 6 Mathematics</h4>
                        <Tabs defaultValue="wa1" className="w-full">
                          <TabsList className="inline-flex gap-1 bg-gray-100 rounded-2xl p-1 shadow-sm mb-4">
                            <TabsTrigger
                              value="wa1"
                              className={`
                                px-6 py-2 rounded-xl transition font-bold uppercase
                                data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                                data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                              `}
                            >
                              WA1
                            </TabsTrigger>
                            <TabsTrigger
                              value="sa2"
                              className={`
                                px-6 py-2 rounded-xl transition font-bold uppercase
                                data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                                data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                              `}
                            >
                              SA2
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="wa1">
                            <ul className="space-y-4 text-sm text-black-600">
                              {testPapers.primary.p6.math.wa1?.map((paper, index) => (
                                <li key={index} className="flex justify-between items-center">
                                  <span>{paper.title}</span>
                                  <Button 
                                    variant="link" 
                                    className="text-emerald-600 hover:text-emerald-700"
                                    onClick={() => handleDownload(paper, "primary.p6.math.wa1")}
                                  >
                                    Download
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                          <TabsContent value="sa2">
                            <ul className="space-y-4 text-sm text-black-600">
                              {testPapers.primary.p6.math.sa2?.map((paper, index) => (
                                <li key={index} className="flex justify-between items-center">
                                  <span>{paper.title}</span>
                                  <Button 
                                    variant="link" 
                                    className="text-emerald-600 hover:text-emerald-700"
                                    onClick={() => handleDownload(paper, "primary.p6.math.sa2")}
                                  >
                                    Download
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  )}
                  {/* Primary 6 Science Papers */}
                  {testPapers.primary.p6.science && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Primary 6 Science</h4>
                        <Tabs defaultValue="wa1" className="w-full">
                          <TabsList className="inline-flex gap-1 bg-gray-100 rounded-2xl p-1 shadow-sm mb-4">
                            <TabsTrigger
                              value="wa1"
                              className={`
                                px-6 py-2 rounded-xl transition font-bold uppercase
                                data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                                data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                              `}
                            >
                              WA1
                            </TabsTrigger>
                            <TabsTrigger
                              value="sa2"
                              className={`
                                px-6 py-2 rounded-xl transition font-bold uppercase
                                data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold
                                data-[state=inactive]:bg-transparent data-[state=inactive]:font-bold
                              `}
                            >
                              SA2
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="wa1">
                            <ul className="space-y-4 text-sm text-black-600">
                              {testPapers.primary.p6.science.wa1?.map((paper, index) => (
                                <li key={index} className="flex justify-between items-center">
                                  <span>{paper.title}</span>
                                  <Button 
                                    variant="link" 
                                    className="text-emerald-600 hover:text-emerald-700"
                                    onClick={() => handleDownload(paper, "primary.p6.science.wa1")}
                                  >
                                    Download
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                          <TabsContent value="sa2">
                            <ul className="space-y-4 text-sm text-black-600">
                              {testPapers.primary.p6.science.sa2?.map((paper, index) => (
                                <li key={index} className="flex justify-between items-center">
                                  <span>{paper.title}</span>
                                  <Button 
                                    variant="link" 
                                    className="text-emerald-600 hover:text-emerald-700"
                                    onClick={() => handleDownload(paper, "primary.p6.science.sa2")}
                                  >
                                    Download
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </>
          )}

          {/* O Level Papers */}
          {(selectedLevel === "all" || selectedLevel === "secondary") && (
            <>
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">O Level Free Exam Papers</h3>
                <div className="grid grid-cols-1 gap-10">

                {/*O Level English */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level English</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.English.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.English.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level Additional Mathematics</h4>
                      {/* Paper 1 */}
                      <h5 className="font-medium mt-2 mb-1">Paper 1</h5>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.A_math.sa2.P1.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.A_math.sa2.P1")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                      {/* Paper 2 */}
                      <h5 className="font-medium mt-4 mb-1">Paper 2</h5>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.A_math.sa2.P2.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.A_math.sa2.P2")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {/*O Level E maths*/}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level Elementary Mathetmatics</h4>
                      {/* Paper */}
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.E_math.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.E_math.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level Chemistry</h4>
                      {/* Paper */}
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.Chemistry.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.Chemistry.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level Physics</h4>
                      {/* Paper */}
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.Physics.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.Physics.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">O Level Biology</h4>
                      {/* Paper 1 */}
                      <h5 className="font-medium mt-2 mb-1">Paper 1</h5>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.Biology.prelim.P1.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.Biology.prelim.P1")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                      {/* Paper 2 */}
                      <h5 className="font-medium mt-4 mb-1">Paper 2</h5>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.secondary.o_level.Biology.prelim.P2.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownload(paper, "secondary.o_level.Biology.prelim.P2")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {/* A Level Papers */}
          {(selectedLevel === "all" || selectedLevel === "jc") && (
            <>
              <h3 className="text-xl font-bold text-purple-700 mb-4">A Level Free Exam Papers</h3>
              <div className="grid grid-cols-1 gap-10">
                {/* A Level GP */}
                {testPapers.jc.generalpaper?.prelim?.length > 0 && (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">A Level H1 GP</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.jc.generalpaper.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-purple-600 hover:text-purple-700"
                              onClick={() => handleDownload(paper, "jc.generalpaper.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {/* A Level Math */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-5">A Level H2 Mathematics</h4>
                    <ul className="space-y-4 text-sm text-black-600">
                      {testPapers.jc.maths.prelim.map((paper, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{paper.title}</span>
                          <Button 
                            variant="link" 
                            className="text-purple-600 hover:text-purple-700"
                            onClick={() => handleDownload(paper, "jc.maths.prelim")}
                          >
                            Download
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* A Level Chemistry */}
                {testPapers.jc.chemistry?.prelim?.length > 0 && (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">A Level H2 Chemistry</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.jc.chemistry.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-purple-600 hover:text-purple-700"
                              onClick={() => handleDownload(paper, "jc.chemistry.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {/* A Level Physics */}
                {testPapers.jc.physics?.prelim?.length > 0 && (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">A Level H2 Physics</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.jc.physics.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-purple-600 hover:text-purple-700"
                              onClick={() => handleDownload(paper, "jc.physics.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {/* A Level Biology */}
                {testPapers.jc.biology?.prelim?.length > 0 && (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">A Level H2 Biology</h4>
                      <ul className="space-y-4 text-sm text-black-600">
                        {testPapers.jc.biology.prelim.map((paper, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span>{paper.title}</span>
                            <Button 
                              variant="link" 
                              className="text-purple-600 hover:text-purple-700"
                              onClick={() => handleDownload(paper, "jc.biology.prelim")}
                            >
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                {/* A Level Economics */}
                {testPapers.jc.economics?.prelim && (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-5">A Level H2 Economics</h4>
                      {/* Paper 1 */}
                      {testPapers.jc.economics.prelim.P1?.length > 0 && (
                        <>
                          <h5 className="font-medium mt-2 mb-1">Paper 1</h5>
                          <ul className="space-y-4 text-sm text-black-600">
                            {testPapers.jc.economics.prelim.P1.map((paper, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span>{paper.title}</span>
                                <Button 
                                  variant="link" 
                                  className="text-purple-600 hover:text-purple-700"
                                  onClick={() => handleDownload(paper, "jc.economics.prelim.P1")}
                                >
                                  Download
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {/* Paper 2 */}
                      {testPapers.jc.economics.prelim.P2?.length > 0 && (
                        <>
                          <h5 className="font-medium mt-4 mb-1">Paper 2</h5>
                          <ul className="space-y-4 text-sm text-black-600">
                            {testPapers.jc.economics.prelim.P2.map((paper, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span>{paper.title}</span>
                                <Button 
                                  variant="link" 
                                  className="text-purple-600 hover:text-purple-700"
                                  onClick={() => handleDownload(paper, "jc.economics.prelim.P2")}
                                >
                                  Download
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </section>

        {/* Download Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Download {selectedPaper?.title}</DialogTitle>
              <DialogDescription>
                Please verify your email address and contact number to proceed with the download of test papers:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your contact number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Download Paper'}
              </Button>
              <p className="text-xs text-gray-500 italic text-center">
                By submitting your information, you agree to be contacted by LionCity Tutors for marketing purposes.
              </p>
            </div>
          </DialogContent>
        </Dialog> 
      </div>
    </>
  );
}