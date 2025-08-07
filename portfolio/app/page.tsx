"use client";
import { useState, useEffect } from "react";
import Project from "@/components/Project";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  const [currentYear, setCurrentYear] = useState("2023");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const projects = [
    {
      id: 1,
      title: "OpenCV Basics ✅",
      description:
        "img = cv2.imread('input.jpg')\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nresized = cv2.resize(gray, (400, 300))",
      tags: ["OpenCV", "Python", "cv2.imread", "cv2.resize"],
      image: "/Project-Images/opencv-demo.gif",
      githubUrl: "https://github.com/EthanRule/opencv-image-operations",
      demo: true,
    },
    {
      id: 2,
      title: "Matrix Transforms 🚧",
      description:
        "# Rotation Matrix\nθ = 45°\n[[cos(θ) -sin(θ)]\n [sin(θ)  cos(θ)]]\n\nEigenvalues: λ₁=2.4, λ₂=0.6",
      tags: ["NumPy", "Matplotlib", "Linear Algebra"],
      image: "/Project-Images/matrix-visualization.png",
      githubUrl: "https://github.com/EthanRule/matrix-transformer",
      interactive: true,
    },
    {
      id: 3,
      title: "Edge Detection 📋",
      description:
        "Before → After\n[Image filters applied live]\nCanny: σ=1.0, low=50, high=150\nSobel: ksize=3, scale=1",
      tags: ["Canny", "Sobel", "Filters"],
      image: "/Project-Images/edge-detection-comparison.jpg",
      githubUrl: "https://github.com/EthanRule/image-filter-toolkit",
      beforeAfter: true,
    },
    {
      id: 4,
      title: "Feature Detection 📋",
      description:
        "✓ QR Code detected: (x:120, y:85)\n✓ Logo matched: 94% confidence\n✓ Keypoints: 247 SIFT, 158 ORB",
      tags: ["SIFT", "ORB", "Pattern Recognition"],
      image: "/Project-Images/feature-detection-demo.gif",
      githubUrl: "https://github.com/EthanRule/qr-logo-detector",
      realtime: true,
    },
    {
      id: 5,
      title: "Panorama Stitching 📋",
      description:
        "3 images → 1 seamless panorama\nHomography matrix computed\n2847 matched features\nBlending: Multi-band",
      tags: ["Homography", "RANSAC", "Stitching"],
      image: "/Project-Images/panorama-stitch-process.jpg",
      githubUrl: "https://github.com/EthanRule/panorama-stitcher",
      process: true,
    },
    {
      id: 6,
      title: "CIFAR-10 CNN 📋",
      description:
        "Epoch 25/30: 94.2% accuracy\nResNet-18 → 11M parameters\nBatch size: 128, LR: 0.001\nVal loss: 0.245 ↓",
      tags: ["PyTorch", "CNN", "ResNet-18"],
      image: "/Project-Images/training-curves.png",
      githubUrl: "https://github.com/EthanRule/cifar10-cnn",
      metrics: true,
    },
    {
      id: 7,
      title: "YOLOv5 Detection 📋",
      description:
        "🎯 person: 0.87\n🚗 car: 0.92\n🚲 bicycle: 0.78\n⚡ 45.3 FPS | 22ms inference",
      tags: ["YOLOv5", "Real-time", "45 FPS"],
      image: "/Project-Images/yolo-detection-live.gif",
      githubUrl: "https://github.com/EthanRule/realtime-object-detection",
      fps: true,
    },
    {
      id: 8,
      title: "Medical Segmentation 📋",
      description:
        "U-Net output:\n🔴 Tumor regions: 23 pixels\n🟢 Healthy tissue: 8,932 pixels\nDice score: 0.94",
      tags: ["U-Net", "Medical AI", "Dice: 0.94"],
      image: "/Project-Images/medical-segmentation-overlay.png",
      githubUrl: "https://github.com/EthanRule/medical-segmentation",
      medical: true,
    },
    {
      id: 9,
      title: "Vision Transformers 📋",
      description:
        "Multi-head attention (8 heads)\nPatch size: 16×16\nObjects detected: 12\nAttention maps visualized ↓",
      tags: ["ViT", "DETR", "Attention Maps"],
      image: "/Project-Images/attention-visualization.png",
      githubUrl: "https://github.com/EthanRule/vision-transformer-detection",
      attention: true,
    },
  ];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Auto-scroll carousel every 10 seconds, with 15-second pause on interaction
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Handle infinite loop transition
  useEffect(() => {
    if (currentSlide === projects.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700); // Wait for transition to complete
    }
  }, [currentSlide, projects.length]);

  // Function to handle user interaction (pauses carousel for 15 seconds)
  const handleUserInteraction = () => {
    setIsCarouselPaused(true);
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 15000); // 15 seconds
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r via-black relative overflow-hidden">
        {/* Animated accent elements */}
        <div className="max-w-7xl mx-auto pt-15 pb-10 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Ethan Rule
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Computer Vision Engineer & AI Researcher
          </p>

          <div className="flex justify-center flex-wrap gap-4 pt-2">
            <a
              href="https://github.com/EthanRule"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-black border border-black hover:border-zinc-800 text-white hover:text-purple-500 px-5 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 m-1 transform hover:scale-105"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://leetcode.com/u/Rudar/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-black border border-black hover:border-zinc-800 text-white hover:text-yellow-500  px-5 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 m-1 transform hover:scale-105"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              <span>LeetCode</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ethanrule/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-black border border-black hover:border-zinc-800 text-white hover:text-blue-300  px-5 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 m-1 transform hover:scale-105"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t-[0.5px] border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-zinc-900 p-4 rounded-lg border border-blue-500/30">
                <div className="text-blue-400 text-2xl mb-2">🔍</div>
                <h3 className="text-sm font-mono text-blue-400 mb-2">
                  import cv2
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  OpenCV • SIFT • ORB
                  <br />
                  Canny • Sobel
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-green-500/30">
                <div className="text-green-400 text-2xl mb-2">🧠</div>
                <h3 className="text-sm font-mono text-green-400 mb-2">
                  import torch
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  PyTorch • CNN
                  <br />
                  ResNet • U-Net
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 text-2xl mb-2">🎯</div>
                <h3 className="text-sm font-mono text-purple-400 mb-2">
                  YOLOv5()
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Real-time • 45fps
                  <br />
                  DETR • R-CNN
                </p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg border border-orange-500/30">
                <div className="text-orange-400 text-2xl mb-2">📊</div>
                <h3 className="text-sm font-mono text-orange-400 mb-2">
                  import numpy
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Linear Algebra
                  <br />
                  Matrix Ops
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Progress Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t-[0.5px] border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Learning Journey Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-900/20 border border-green-600 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-green-400">
                    Phase 1: Foundations
                  </h3>
                  <span className="text-green-400 text-2xl">✅</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Weeks 1-6</p>
                <div className="bg-green-600 h-2 rounded-full mb-2"></div>
                <p className="text-xs text-gray-400">
                  OpenCV basics, Python mastery, Math foundations
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Phase 2: Classical CV
                  </h3>
                  <span className="text-zinc-400 text-2xl">📋</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Weeks 7-10</p>
                <div className="bg-zinc-600 h-2 rounded-full mb-2"></div>
                <p className="text-xs text-gray-400">
                  Feature detection, Geometric vision
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-purple-400">
                    Phase 3: Deep Learning
                  </h3>
                  <span className="text-zinc-400 text-2xl">📋</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Weeks 11-18</p>
                <div className="bg-zinc-600 h-2 rounded-full mb-2"></div>
                <p className="text-xs text-gray-400">
                  CNNs, Object detection, Segmentation
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Phase 4-6: Advanced
                  </h3>
                  <span className="text-zinc-400 text-2xl">📋</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Weeks 19-32</p>
                <div className="bg-zinc-600 h-2 rounded-full mb-2"></div>
                <p className="text-xs text-gray-400">
                  Transformers, Deployment, Portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Background Image */}
      <section className="relative py-12 border-t-[0.5px] border-zinc-800">
        {/* Background Image - Full Width */}

        {/* Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-0"></div>
        {/* Projects Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pb-10 relative">
            <div className="relative z-10 flex flex-col justify-start">
              <div className="relative">
                <h1 className="text-6xl font-bold pb-1 justify-start pl-20">
                  Projects
                </h1>
                <div className="h-px w-full lg:w-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-1 opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Carousel */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={handleUserInteraction}
          >
            <div
              className={`flex ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="max-w-2xl mx-auto">
                    <Project
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      image={project.image}
                      githubUrl={project.githubUrl}
                      demo={project.demo}
                      interactive={project.interactive}
                      beforeAfter={project.beforeAfter}
                      realtime={project.realtime}
                      process={project.process}
                      metrics={project.metrics}
                      fps={project.fps}
                      medical={project.medical}
                      attention={project.attention}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate first project for seamless loop */}
              <div
                key={`${projects[0].id}-duplicate`}
                className="flex-shrink-0 w-full px-4"
              >
                <div className="max-w-2xl mx-auto">
                  <Project
                    id={projects[0].id}
                    title={projects[0].title}
                    description={projects[0].description}
                    tags={projects[0].tags}
                    image={projects[0].image}
                    githubUrl={projects[0].githubUrl}
                    demo={projects[0].demo}
                    interactive={projects[0].interactive}
                    beforeAfter={projects[0].beforeAfter}
                    realtime={projects[0].realtime}
                    process={projects[0].process}
                    metrics={projects[0].metrics}
                    fps={projects[0].fps}
                    medical={projects[0].medical}
                    attention={projects[0].attention}
                  />
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    handleUserInteraction();
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide % projects.length
                      ? "bg-indigo-500 scale-110"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                setCurrentSlide((prev) => {
                  if (prev === 0) {
                    setIsTransitioning(false);
                    const newSlide = projects.length;
                    setTimeout(() => {
                      setIsTransitioning(true);
                      setCurrentSlide(projects.length - 1);
                    }, 50);
                    return newSlide;
                  }
                  return prev - 1;
                });
                handleUserInteraction();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setCurrentSlide((prev) => prev + 1);
                handleUserInteraction();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </main>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex space-x-6 justify-center">
              <a
                href="https://github.com/EthanRule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-500 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ethanrule/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a
                href="https://leetcode.com/u/Rudar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <span className="sr-only">LeetCode</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
