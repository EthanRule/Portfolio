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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Animated accent elements */}
        <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
            Ethan Rule
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
            Computer Vision Engineer • BS Computer Science (AI) • Vision
            Transformer Specialist
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
              Download Resume
            </button>
            <button className="border border-slate-400 text-slate-300 hover:text-white hover:border-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              About Me
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Computer Vision Engineer with a BS in Computer Science
                specializing in Artificial Intelligence. I've successfully
                completed an intensive advanced specialization program,
                mastering everything from classical computer vision to
                cutting-edge Vision Transformers and DETR models.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                My expertise spans the entire computer vision pipeline - from
                foundational image processing and feature detection to modern
                deep learning architectures. I excel at translating complex
                research into production-ready solutions that solve real-world
                problems.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">BS</div>
                  <div className="text-sm text-slate-600">CS/AI Degree</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">25+</div>
                  <div className="text-sm text-slate-600">Technologies</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-lg font-medium text-slate-900 mb-6">
                Core Expertise
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Vision Transformers & DETR
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Deep Learning Deployment
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Classical CV & Modern ML
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">Production Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300">
                <div className="text-blue-600 text-2xl mb-3">🔍</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  import cv2
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  OpenCV • SIFT • ORB
                  <br />
                  Canny • Sobel
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-green-400 transition-all duration-300">
                <div className="text-green-600 text-2xl mb-3">🧠</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  import torch
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  PyTorch • CNN
                  <br />
                  ResNet • U-Net
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-purple-400 transition-all duration-300">
                <div className="text-purple-600 text-2xl mb-3">🎯</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  YOLOv5()
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  Real-time • 45fps
                  <br />
                  DETR • R-CNN
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-orange-400 transition-all duration-300">
                <div className="text-orange-600 text-2xl mb-3">📊</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  import numpy
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  Linear Algebra
                  <br />
                  Matrix Ops
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 bg-white">
        {/* Projects Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Featured Projects
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto"></div>
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
            <div className="flex justify-center mt-12 space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    handleUserInteraction();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide % projects.length
                      ? "bg-slate-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Technical Skills
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A comprehensive toolkit focused on computer vision, web
              development, and modern programming languages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Computer Vision */}
            <div className="text-center">
              <div className="bg-slate-50 p-6 rounded-xl mb-4">
                <div className="text-2xl mb-3">🔍</div>
                <h3 className="font-medium text-slate-900 mb-3">
                  Computer Vision
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>Vision Transformers</div>
                  <div>DETR Models</div>
                  <div>Segmentation</div>
                  <div>OpenCV Advanced</div>
                  <div>Real-time Systems</div>
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="text-center">
              <div className="bg-slate-50 p-6 rounded-xl mb-4">
                <div className="text-2xl mb-3">💻</div>
                <h3 className="font-medium text-slate-900 mb-3">
                  Deep Learning
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>PyTorch</div>
                  <div>TensorFlow</div>
                  <div>Python (Advanced)</div>
                  <div>CUDA Programming</div>
                  <div>Model Optimization</div>
                </div>
              </div>
            </div>

            {/* Web Technologies */}
            <div className="text-center">
              <div className="bg-slate-50 p-6 rounded-xl mb-4">
                <div className="text-2xl mb-3">🌐</div>
                <h3 className="font-medium text-slate-900 mb-3">
                  Web Development
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>React</div>
                  <div>Next.js</div>
                  <div>Node.js</div>
                  <div>Tailwind CSS</div>
                  <div>RESTful APIs</div>
                </div>
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="text-center">
              <div className="bg-slate-50 p-6 rounded-xl mb-4">
                <div className="text-2xl mb-3">🛠️</div>
                <h3 className="font-medium text-slate-900 mb-3">
                  Tools & Platforms
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>Git/GitHub</div>
                  <div>VS Code</div>
                  <div>Docker</div>
                  <div>Firebase</div>
                  <div>Vercel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Progress Bars */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-medium text-slate-900 mb-8 text-center">
              Proficiency Overview
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Vision Transformers & DETR
                    </span>
                    <span className="text-sm text-slate-500">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Python & Deep Learning
                    </span>
                    <span className="text-sm text-slate-500">95%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      PyTorch & TensorFlow
                    </span>
                    <span className="text-sm text-slate-500">90%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Classical Computer Vision
                    </span>
                    <span className="text-sm text-slate-500">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      ML Model Deployment
                    </span>
                    <span className="text-sm text-slate-500">88%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Full-Stack Development
                    </span>
                    <span className="text-sm text-slate-500">85%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              What People Say
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Feedback from colleagues and collaborators on recent projects and
              contributions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-slate-600 mb-6 italic">
                "Exceptional expertise in Vision Transformers and DETR models.
                The deployment optimizations achieved 40% faster inference with
                maintained accuracy - exactly what we needed for production."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-slate-600 font-medium">JD</span>
                </div>
                <div>
                  <div className="font-medium text-slate-900">John Doe</div>
                  <div className="text-sm text-slate-500">Lead Developer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-slate-600 mb-6 italic">
                "Delivered a complete segmentation pipeline with custom loss
                functions and data augmentation. The model achieved
                state-of-the-art results on our dataset."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-slate-600 font-medium">SM</span>
                </div>
                <div>
                  <div className="font-medium text-slate-900">Sarah Miller</div>
                  <div className="text-sm text-slate-500">Project Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-slate-600 mb-6 italic">
                "Advanced knowledge in deep learning architectures and
                deployment strategies. Successfully implemented and optimized
                multiple Vision Transformer models for our research lab."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-slate-600 font-medium">AR</span>
                </div>
                <div>
                  <div className="font-medium text-slate-900">Alex Rivera</div>
                  <div className="text-sm text-slate-500">Senior Engineer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
              <h3 className="text-xl font-medium text-slate-900 mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-slate-600 mb-6">
                Let's discuss how I can contribute to your next project or team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  View Resume
                </button>
                <button className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Let's Work Together
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Interested in computer vision projects or discussing
              opportunities? I'm always open to connecting with fellow engineers
              and potential collaborators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-slate-900 mb-6">
                Send a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-slate-900 mb-4">
                  Quick Connect
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:your.email@example.com"
                    className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    your.email@example.com
                  </a>
                  <div className="flex items-center text-slate-600">
                    <svg
                      className="w-5 h-5 mr-3 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Available for Remote Work
                  </div>
                  <div className="flex items-center text-slate-600">
                    <svg
                      className="w-5 h-5 mr-3 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Response within 24 hours
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-slate-900 mb-4">
                  Specializations
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Vision Transformers & DETR</li>
                  <li>• Advanced Segmentation Models</li>
                  <li>• Production ML Deployment</li>
                  <li>• Deep Learning Architecture</li>
                  <li>• End-to-End CV Solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-light mb-4">Portfolio</h3>
              <p className="text-slate-300 mb-4 max-w-md">
                Specialized in computer vision and web development, creating
                innovative solutions that bridge the gap between complex
                algorithms and user-friendly interfaces.
              </p>
              <div className="flex items-center text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Available for work
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a
                    href="#projects"
                    className="hover:text-white transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-white transition-colors"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Specialties</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Computer Vision</li>
                <li>Web Development</li>
                <li>Image Processing</li>
                <li>API Development</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 Portfolio. Built with Next.js and Tailwind CSS.
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/EthanRule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a
                  href="https://leetcode.com/u/Rudar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <span className="sr-only">LeetCode</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
