import axios from "axios";

const API_URL = "http://localhost:5000/api/resume8";

export const fetchResume = async () => {
  try {
    const response = await axios.get(`${API_URL}/resume8/get`);
    const data = response.data; // Axios auto-parses JSON

    console.log("API Response:", data); // Debug log

    if (!data) { // ✅ Fix the validation check
      console.error("❌ Invalid API response:", data);
      return null;
    }

    return data; // ✅ Return the correct data
  } catch (error) {
    console.error("🔥 Error fetching resume:", error);
    return null;
  }
};

export const saveResume = async (resumeData) => {
  await axios.post(`${API_URL}/resume/save`, resumeData);
};

export const enhanceResumeSection = async (section, content) => {
  console.log("🛠 Sending Enhancement Request:", { section, content }); // ✅ Debugging log

  try {
    const response = await axios.post("http://localhost:5000/api/resume8/enhance", {
      section,
      content,
    });

    console.log("✅ Enhancement Response:", response.data);
    return response.data.enhancedContent;
  } catch (error) {
    console.error("❌ Enhancement API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const downloadResumePDF = async () => {
  const clientURL = `${window.location.origin}/printable-resume?enhanced=true`; // Add query param
  
  try {
    console.log("📤 Sending request to generate PDF for:", clientURL);
    
    const response = await axios.post(
      `${API_URL}/generate-pdf`,
      { clientURL }, 
      { responseType: "blob" }
    );

    if (response.status !== 200) throw new Error("Failed to generate PDF");

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = window.URL.createObjectURL(pdfBlob);

    return pdfUrl;
  } catch (error) {
    console.error("❌ Error downloading PDF:", error);
    return null;
  }
};