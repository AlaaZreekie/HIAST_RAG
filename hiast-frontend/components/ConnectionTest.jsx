"use client";
import { useState } from "react";
import { authAPI } from "@/lib/api";

const ConnectionTest = () => {
  const [testResult, setTestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult("Testing connection...");
    
    try {
      // Test basic connection
      const response = await fetch("http://localhost:5007/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: "test@test.com",
          Password: "test123",
          RememberMe: false,
        }),
      });
      
      const data = await response.json();
      
      setTestResult(`
        Status: ${response.status}
        OK: ${response.ok}
        Result: ${data.Result}
        Message: ${data.Message}
        Has Data: ${!!data.Data}
        Has Token: ${!!data.Data?.Token}
        Has Token Token: ${!!data.Data?.Token?.Token}
        Full Response: ${JSON.stringify(data, null, 2)}
      `);
    } catch (error) {
      setTestResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">API Connection Test</h3>
      <button 
        onClick={testConnection}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Testing..." : "Test Connection"}
      </button>
      {testResult && (
        <pre className="mt-4 p-2 bg-gray-100 rounded text-sm overflow-auto">
          {testResult}
        </pre>
      )}
    </div>
  );
};

export default ConnectionTest; 