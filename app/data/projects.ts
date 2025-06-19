export const categories = [
  "Recent",
  "Highlights",
  "Generative AI",
  "AI+Full Stack",
  "AI/ML",
  "Computer Vision",
  "NLP",
  "Research",
  "Patents",
  "Streamlit",
  "Database",
];

export interface Project {
  title: string;
  description: string;
  keyskills: string;
  image: string;
  url: string;
  categories: string[];
  startDate: string;
  endDate?: string;
  highlighted?: boolean;
}

export const projects: Project[] = [
  {
    title: "Omni Truly Personal AGI",
    description:
      "Designed Omni, a context-aware multimodal AI assistant that recalls memories, assists tasks, navigates spaces, supports learning, and enhances wellbeing through adaptive modes and intelligent sensory integration.",
    keyskills:
      "Multimodal AI, Vector Databases, Speech Recognition, RAG, Depth Estimation, Context Awareness, Task Automation, Gemini Integration",
    image: "/projects/Omni.png",
    url: "https://github.com/kcharvi/Omni_Truly_Personal_AGI",
    categories: ["Recent", "AI/ML", "Generative AI", "Highlights"],
    startDate: "11/2024",
    endDate: "02/2025",
    highlighted: true,
  },
  {
    title: "PaliGemma: Multimodal Vision-Language Model from Scratch",
    description:
      "Recreated PaliGemma from scratch to deeply understand vision-language model components like SigLIP, Gemma, KV cache, attention types, contrastive learning, rotary embeddings, and multimodal inference architecture.",
    keyskills:
      "Vision-Language Models, Contrastive Learning, Rotary Embeddings, KV Cache, Multimodal Inference, PyTorch, Transformer Architectures, SigLIP, Gemma",
    image: "/projects/PaliGemma.png",
    url: "https://github.com/kcharvi/Vision_Language_Model_From_Scratch",
    categories: ["Recent", "AI/ML", "Generative AI", "Highlights"],
    startDate: "05/2025",
    endDate: "05/2025",
    highlighted: true,
  },
  {
    title:
      "Magnecruit: AI-Powered Productive Recruitment Workspace Application",
    description:
      "Built an AI-powered recruitment platform with real-time chat, dynamic workspaces, and agentic backend logic using Flask and Gemini API, enhancing recruiter productivity and natural language interaction.",
    keyskills:
      "Python, Flask, SQLAlchemy, Google Gemini API, React, TypeScript, Prompt Engineering, Flask-SocketIO, PostgreSQL, Socket.IO",
    image: "/projects/Magnecruit.png",
    url: "https://github.com/kcharvi/Magnecruit",
    categories: [
      "Recent",
      "AI+Full Stack",
      "Generative AI",
      "Database",
      "Highlights",
    ],
    startDate: "04/2025",
    endDate: "05/2025",
    highlighted: true,
  },
  {
    title: "Resonique: Multimodal Music Recommendation App",
    description:
      "Developed an emotion-aware music retrieval system that interprets user context using Gemini Flash, transforming multi-modal inputs into MPNet embeddings for semantic song matching via Pinecone and Spotify.",
    keyskills:
      "Multi-modal Search, Generative AI, LLM, Vector Search, MPNet, CLAP, Pinecone, Supabase, API Integration, Streamlit",
    image: "/projects/Resonique.png",
    url: "https://github.com/kcharvi/Resonique",
    categories: ["Recent", "AI/ML", "Generative AI", "Streamlit", "Highlights"],
    startDate: "02/2025",
    endDate: "03/2025",
    highlighted: true,
  },
  {
    title:
      "Adaptive Driver Assistance: Context-based Approach to Pedestrian Safety",
    description:
      "Optimized Vision Transformer training for pedestrian intention recognition using LoRA adapters, achieving 90% accuracy with only 0.68% trainable parameters. Leveraged YOLOv8 to extract ROIs and Vision Transformer for classification on JAAD video clips.",
    keyskills:
      "Vision Transformer, Parameter Efficient Fine-Tuning, LoRA, YOLOv8, Object Detection, Low-Rank Adaptation, Deep Learning, Data Augmentation",
    image: "/projects/ADAS.gif",
    url: "https://www.techrxiv.org/doi/full/10.36227/techrxiv.174495400.07758247",
    categories: [
      "Recent",
      "AI/ML",
      "Research",
      "Computer Vision",
      "Highlights",
    ],
    startDate: "06/2024",
    endDate: "12/2024",
    highlighted: true,
  },
  {
    title: "F.E.A.S.T: Food & Ingredient AI Suggestion Technology",
    description:
      "Engineered a smart meal planning pipeline using object detection on food images and recipe tokenization, enabling personalized, nutrition-rich suggestions powered by BART and Hugging Face models.",
    keyskills:
      "Multimodal AI, Text Generation, Tokenization, Deep Learning, Hugging Face, Grounding DINO, BART, T5, BERT-FDA, Recipe Generation, Named Entity Recognition",
    image: "/projects/Feast.png",
    url: "https://github.com/kcharvi/F.E.A.S.T",
    categories: ["AI/ML", "Generative AI", "NLP", "Streamlit", "Highlights"],
    startDate: "01/2024",
    endDate: "05/2024",
    highlighted: true,
  },
  {
    title: "RxRovers: Roaming for Rapid Relief",
    description:
      "Simulated dynamic medicine delivery using Deep RL, implementing and comparing six algorithms for path optimization and obstacle avoidance, including PPO, A2C, and Deep Q-Networks in custom Gym environments.",
    keyskills:
      "Deep Reinforcement Learning, Q-Learning, Deep Q Networks, A2C, PPO, Actor-Critic, Path Planning, Obstacle Avoidance, Gymnasium, Python",
    image: "/projects/rx_rover_project.gif",
    url: "https://github.com/kcharvi/RxRover-Roaming-for-Rapid-Relief",
    categories: ["AI/ML", "Highlights"],
    startDate: "02/2024",
    endDate: "05/2024",
    highlighted: true,
  },
  {
    title: "Immigration Reforms Sentiment Analysis with SenticNet APIs",
    description:
      "Conducted concept-based sentiment analysis on immigration-related tweets using SenticNet APIs and Word2Vec embeddings, benchmarking TextBlob, VADER, and Gensim models under NTU research guidance.",
    keyskills:
      "Word2Vec, Semantic Similarity, TextBlob, VADER, Gensim, Scikit-learn, Unsupervised Learning, Sentiment Analysis, Concept Parsing",
    image: "/projects/Immigration.png",
    url: "https://github.com/kcharvi/Immigration-Reforms-SenticNet-Computing-Analysis",
    categories: ["AI/ML", "Research", "NLP"],
    startDate: "01/2022",
    endDate: "06/2022",
    highlighted: false,
  },
  {
    title: "Crimson Eye: Data Driven Approach to Crime Analysis",
    description:
      "Designed a predictive policing tool using 14 ML models, LDA topic modeling, and clustering to analyze crime patterns and assist law enforcement with strategic resource planning.",
    keyskills:
      "Machine Learning, Neural Networks, LDA, Clustering, Flask, JavaScript, HTML, CSS, Data Visualization, Predictive Modeling, Crime Analysis",
    image: "/projects/CrimsonEye.png",
    url: "https://github.com/kcharvi/Predictive-Crime-Analysis",
    categories: ["AI+Full Stack", "AI/ML", "NLP"],
    startDate: "08/2023",
    endDate: "12/2023",
    highlighted: false,
  },
  {
    title: "Gear Shift Genius: Master of Formula 1 Data Management",
    description:
      "Created a high-performance PostgreSQL database system for Formula 1 analytics, focusing on query cost optimization and indexing to support complex race strategy queries.",
    keyskills:
      "SQL, PostgreSQL, Query Optimization, Indexing, Data Management, Python, HTML, CSS, Database Design, Performance Tuning",
    image: "/projects/GearShiftDB.png",
    url: "https://github.com/kcharvi/GearShift-DB",
    categories: ["Database"],
    startDate: "03/2024",
    endDate: "05/2024",
    highlighted: false,
  },
  {
    title:
      "Mapping Crime Dynamics: Integrating Textual, Spatial, and Temporal Perspectives",
    description:
      "Integrated multiple data modalities to predict crime types and trends using Random Forest, XGBoost, LSTM, and LDA topic modeling, enabling strategic identification of high-risk areas.",
    keyskills:
      "Machine Learning, LSTM, Random Forest, XGBoost, Bagging, Boosting, Topic Modeling, LDA, Clustering, BIRCH, Mini Batch KMeans, Time-Series Analysis",
    image: "/projects/MappingCrime.png",
    url: "https://ieeexplore.ieee.org/abstract/document/10754762",
    categories: ["AI/ML", "Research", "NLP", "Highlights"],
    startDate: "01/2024",
    endDate: "06/2024",
    highlighted: true,
  },
  {
    title: "Automated Monitoring System for Healthier Aquaculture Farming",
    description:
      "Deployed UAV-based monitoring using YOLOv5 and night-vision cameras to detect dead fish with 88% accuracy, enabling real-time alerts and enhancing aquaculture farm health under challenging conditions.",
    keyskills:
      "UAV Surveillance, Deep Learning, IoT, Real-Time Monitoring, Night Vision, Alert Systems, Computer Vision, Drone Technology",
    image: "/projects/Aquaculture.png",
    url: "https://ieeexplore.ieee.org/document/10200444",
    categories: ["AI/ML", "Research", "Computer Vision"],
    startDate: "01/2023",
    endDate: "07/2023",
    highlighted: false,
  },
  {
    title: "Attention based Discrimination of Mycoplasma Pneumonia",
    description:
      "Applied attention mechanisms and UGTN transformer models for high-dimensional feature extraction, enhancing pneumonia classification accuracy using COVID-19 Radiography images with TensorFlow and PyTorch frameworks.",
    keyskills:
      "Attention Mechanisms, Transformers, UGTN, TensorFlow, PyTorch, Keras, OpenCV, Python, Medical Imaging, Deep Learning",
    image: "/projects/Mycoplasma.png",
    url: "https://link.springer.com/chapter/10.1007/978-981-16-7182-1_3",
    categories: ["AI/ML", "Research", "Computer Vision", "Highlights"],
    startDate: "06/2021",
    endDate: "02/2022",
    highlighted: true,
  },
  {
    title: "Journey of Letters to Vectors through Neural Networks",
    description:
      "Surveyed the evolution of image captioning from early methods to advanced deep learning, highlighting LSTM, CNN, attention mechanisms, and transfer learning applied on the Flickr8K dataset.",
    keyskills:
      "Image Captioning, Neural Networks, LSTM, CNN, Attention Mechanism, Transfer Learning, NLP, Deep Learning, Flickr8K Dataset",
    image: "/projects/LettersVectors.png",
    url: "https://link.springer.com/chapter/10.1007/978-981-16-6289-8_58",
    categories: ["AI/ML", "Research", "NLP"],
    startDate: "02/2021",
    endDate: "06/2021",
    highlighted: false,
  },
  {
    title: "Snake Detector and Alerting Gadget for Rural India Using Yolo",
    description:
      "Created a low-cost, real-time snake detection and alert system integrating YOLOv5 with IoT devices, tailored for rural Indian environments and challenging lighting.",
    keyskills:
      "Object Detection, IoT Integration, Data Augmentation, Real-Time Detection, Embedded Systems, Alert Mechanisms, Low-Light Vision, Patent",
    image: "/projects/Snake.gif",
    url: "https://drive.google.com/file/d/1DJUW3bJ8GAPprafWFNVHb4CcZUwgRDRa/view?usp=drive_link",
    categories: ["AI/ML", "Patents", "Computer Vision"],
    startDate: "01/2021",
    endDate: "08/2021",
    highlighted: false,
  },
  {
    title: "Python Based Motion Sensing Digital Writing Pad",
    description:
      "Designed and patented a non-touch digital writing pad using motion detection and OpenCV, offering user-friendly writing tools and export options for education in low-resource settings.",
    keyskills:
      "Python, OpenCV, Motion Sensing, Digital Writing Pad, Autocorrect, Spell Check, File Export, Accessibility Technology, Patent",
    image: "/projects/PyDigital.png",
    url: "https://drive.google.com/file/d/1dq0wW6jHYLTzFk5GzrVDyapNibaOuKHS/view?usp=drive_link",
    categories: ["Patents", "Computer Vision"],
    startDate: "01/2021",
    endDate: "12/2021",
    highlighted: false,
  },
  {
    title: "A Traffic Control System",
    description:
      "Created an AI-driven traffic control solution that monitors traffic density and environmental factors in real-time to improve flow and prioritize emergency response.",
    keyskills:
      "Deep Learning, Real-Time Video Analysis, Traffic Management, Signal Optimization, Emergency Vehicle Detection, Weather Adaptation, AI, Workflow Efficiency, Patent",
    image: "/projects/Traffic.png",
    url: "https://drive.google.com/file/d/1fkZByjlH_fKrEhoGkK7CIwObRMzPKOLu/view?usp=sharing",
    categories: ["Patents"],
    startDate: "06/2022",
    endDate: "12/2022",
    highlighted: false,
  },
  {
    title:
      "System And Method To Extract And Analyse Textual Features From An Image",
    description:
      "Created an image analysis method combining GLCM and self-updating fuzzy clustering for detailed text feature extraction and accurate key-element identification.",
    keyskills:
      "Gray-Level Co-occurrence Matrix (GLCM), Fuzzy Clustering, Textual Feature Extraction, Image Analysis, Machine Learning, Patent",
    image: "/projects/Fuzzy.jpg",
    url: "https://drive.google.com/file/d/17SENHGYsiSqXXwcsX6ucmLp5SofqJjj1/view?usp=drive_link",
    categories: ["Patents"],
    startDate: "06/2023",
    endDate: "12/2023",
    highlighted: false,
  },
];

projects.sort((a, b) => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  const [aMonth, aYear] = a.startDate.split("/").map(Number);
  const [bMonth, bYear] = b.startDate.split("/").map(Number);

  const aDate = new Date(aYear, aMonth - 1);
  const bDate = new Date(bYear, bMonth - 1);

  const aIsRecent = aDate >= threeMonthsAgo;
  const bIsRecent = bDate >= threeMonthsAgo;

  if (aIsRecent !== bIsRecent) {
    return aIsRecent ? -1 : 1;
  }

  if (!aIsRecent && !bIsRecent) {
    if (a.highlighted !== b.highlighted) {
      return a.highlighted ? -1 : 1;
    }
  }

  if (aYear !== bYear) {
    return bYear - aYear;
  }
  return bMonth - aMonth;
});
