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
import { Tabs as LevelTabs, TabsList as LevelTabsList, TabsTrigger as LevelTabsTrigger } from "@/components/ui/tabs";
import { notesData } from "../../data/notesData"; 

export default function FreeNotes() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNotePath, setSelectedNotePath] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Function to extract analytics from notes path and title
  const extractNoteInfo = (notePath, noteTitle) => {
    const pathParts = notePath.split('.');
    const level = pathParts[0];
    const subject = pathParts[2];

    // Extract year from title if available, otherwise default
    const yearMatch = noteTitle.match(/(\d{4})/);
    const year = yearMatch ? yearMatch[1] : 'N.A.';

    return { level, subject, year };
  };

  const handleDownload = (note, notePath) => {
    setSelectedNote(note);
    setSelectedNotePath(notePath);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Extract analytics info
      const { level, subject, year } = extractNoteInfo(selectedNotePath, selectedNote.title);

      const response = await fetch('/api/notes-leads', {
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
      if (selectedNote?.downloadUrl) {
        window.open(selectedNote.downloadUrl, '_blank');
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
          <h1 className="text-4xl font-bold text-teal-800">Free Notes</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Access our collection of free notes for various subjects to help with your revision and understanding.
          </p>
        </section>

        {/* Notes Section */}
        <section className="space-y-8">
          {/* Primary Notes */}
          {(selectedLevel === "all" || selectedLevel === "primary") && (
            <>
              <div>
                <h3 className="text-xl font-bold text-teal-700 mb-4">Primary Level Notes</h3>
                <div className="grid grid-cols-1 gap-10">
                  {/* Primary 5 English Notes */}
                  {notesData.primary?.p5?.english?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Primary 5 English</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.primary.p5.english.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-teal-600 hover:text-teal-700"
                                onClick={() => handleDownload(note, "primary.p5.english")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* Primary 5 Math Notes */}
                  {notesData.primary?.p5?.math?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Primary 5 Mathematics</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.primary.p5.math.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-teal-600 hover:text-teal-700"
                                onClick={() => handleDownload(note, "primary.p5.math")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* Add other primary subjects similarly */}
                </div>
              </div>
            </>
          )}

          {/* O Level Notes */}
          {(selectedLevel === "all" || selectedLevel === "secondary") && (
            <>
              <div>
                <h3 className="text-xl font-bold text-sky-700 mb-4">O Level Notes</h3>
                <div className="grid grid-cols-1 gap-10">
                  {/* O Level English Notes */}
                  {notesData.secondary?.o_level?.english?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-5">O Level English</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.secondary.o_level.english.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-sky-600 hover:text-sky-700"
                                onClick={() => handleDownload(note, "secondary.o_level.english")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* O Level A-Math Notes */}
                  {notesData.secondary?.o_level?.A_math?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-5">O Level Additional Mathematics</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.secondary.o_level.A_math.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-sky-600 hover:text-sky-700"
                                onClick={() => handleDownload(note, "secondary.o_level.A_math")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* Add other secondary subjects similarly */}
                </div>
              </div>
            </>
          )}

          {/* A Level Notes */}
          {(selectedLevel === "all" || selectedLevel === "jc") && (
            <>
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-4">A Level Notes</h3>
                <div className="grid grid-cols-1 gap-10">
                  {/* A Level GP Notes */}
                  {notesData.jc?.generalpaper?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-5">A Level H1 GP</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.jc.generalpaper.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-indigo-600 hover:text-indigo-700"
                                onClick={() => handleDownload(note, "jc.generalpaper")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* A Level Maths Notes */}
                  {notesData.jc?.maths?.length > 0 && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-5">A Level H2 Mathematics</h4>
                        <ul className="space-y-4 text-sm text-black-600">
                          {notesData.jc.maths.map((note, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{note.title}</span>
                              <Button
                                variant="link"
                                className="text-indigo-600 hover:text-indigo-700"
                                onClick={() => handleDownload(note, "jc.maths")}
                              >
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                  {/* Add other JC subjects similarly */}
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Download Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download Free {selectedNote?.title}</DialogTitle>
            <DialogDescription>
              Please provide your details to download the notes. We'll send you updates on new resources!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+65 9123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Downloading..." : "Download Now"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}