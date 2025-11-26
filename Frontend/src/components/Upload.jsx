import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 📂 When file is selected
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile?.name);
    setFile(selectedFile);
  };

  // ⬆️ When "Upload" button is clicked
  const handleUpload = async () => {
    if (!file) {
      setMessage(" Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("http://localhost:5001/doc/upload", formData);

      console.log("✅ Upload response:", res.data);
      setMessage(res.data.message || "✅ File uploaded successfully");

      
      setFile(null);
      document.getElementById("formFile").value = null;
    } catch (err) {
      console.error(" Upload error:", err);

  if (err.response && err.response.data && err.response.data.message) {
    setMessage( err.response.data.message);  
  } else {
    setMessage(" Something went wrong.");
  }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📤 Upload Excel File</h2>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select Excel (.xlsx) file</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} accept=".xlsx,.xls" />
      </Form.Group>

      <Button
        variant="primary"
        className="mt-2"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Upload;
