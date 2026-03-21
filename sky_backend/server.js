const express = require('express');
const cors = require('cors');
const axios = require('axios'); // npm install axios
const app = express();

app.use(cors()); // Permits localhost:3000 to access this server
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Backend working correctly");
});


// 1. Endpoint for Company Registration
app.post('/api/addResto', async (req, res) => {
    try {
        const response = await axios.post('https://civil.skitechno.com/api/resto/addResto', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        // Detailed logging in your terminal
        console.error("C# addResto Error:", error.response?.data || error.message);
        
        // Send the specific error status and message back to React
        const status = error.response?.status || 500;
        const message = error.response?.data || "API Gateway failed for Company Master";
        res.status(status).json(message);
    }
});

// 1b. Endpoint to fetch all registered companies (CORS-safe proxy)
app.get('/api/getAllResto', async (req, res) => {
  try {
    const response = await axios.get('https://civil.skitechno.com/api/resto/getAllResto');
    res.status(200).json(response.data);
  } catch (error) {
    console.error("C# getAllResto Error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || "API Gateway failed for fetching companies";
    res.status(status).json(message);
  }
});

// 2. Endpoint for User Login Credentials
app.post('/api/addRestoLogin', async (req, res) => {
    try {
        console.log("Incoming /api/addRestoLogin body:", req.body);
        const response = await axios.post('https://civil.skitechno.com/api/resto/addRestoLogin', req.body);
        console.log("C# addRestoLogin raw response:", response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("C# addRestoLogin Error:", error.response?.data || error.message);
        
        const status = error.response?.status || 500;
        const message = error.response?.data || "API Gateway failed for User Creation";
        res.status(status).json(message);
    }
});

app.post("/api/checkLogin", async (req, res) => {

  try {

    console.log("Login request:", req.body);

    const response = await axios.post(
      "https://civil.skitechno.com/api/resto/checkLogin",
      {
        USRNAME: req.body.USRNAME,
        USRPASS: req.body.USRPASS
      }
    );

    console.log("API Response:", response.data);

    res.json(response.data);

  } catch (error) {

    console.error("Login API error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

app.get("/api/getCompanyName/:clientId", async (req, res) => {

  try {

    const clientId = req.params.clientId;

    console.log("Fetching company name for:", clientId);

    const response = await axios.get(
      `https://civil.skitechno.com/api/resto/getCompanyName?clientId=${clientId}`
    );

    res.json(response.data);

  } catch (error) {

    console.error("Company Name API error:", error.message);

    res.status(500).json({
      success: false
    });

  }

});

app.post("/api/resto/saveTable", async (req, res) => {
  try {
    const externalApiUrl = "https://civil.skitechno.com/api/resto/saveTable";

    console.log("Incoming Table Data:", req.body);

    const response = await axios.post(externalApiUrl, req.body);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling external table save API:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to connect to external table API",
      error: error.response?.data || error.message,
    });
  }
});


app.post('/api/resto/saveSupplier', async (req, res) => {
  try {
    const externalApiUrl = 'https://civil.skitechno.com/api/resto/saveSupplier';

    console.log('Incoming Supplier Data:', req.body);

    const response = await axios.post(externalApiUrl, req.body);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error calling external supplier save API:',
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to connect to external supplier API',
      error: error.response?.data || error.message,
    });
  }
});

app.post('/api/resto/saveSupplierCategory', async (req, res) => {
    try {
        const externalApiUrl = "https://civil.skitechno.com/api/resto/saveSupCategory";
        
        // Forward the request to the external API
        const response = await axios.post(externalApiUrl, req.body);

        // Send the response from the external API back to the React frontend
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calling external API:", error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            message: "Failed to connect to the external supplier API",
            error: error.message
        });
    }
});

app.post("/api/resto/saveProduct", async (req, res) => {
  try {
    console.log("Incoming Product Data:", req.body);

    const response = await axios.post(
      "https://civil.skitechno.com/api/resto/saveProduct",
      req.body
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error calling external product save API:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to connect to external product save API",
      error: error.response?.data || error.message,
    });
  }
});

app.post('/api/resto/saveMenu', async (req, res) => {
  try {
    const externalApiUrl = 'https://civil.skitechno.com/api/resto/saveMenu';

    console.log('Incoming Menu Data:', req.body);

    const response = await axios.post(externalApiUrl, req.body);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error calling external menu save API:',
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to connect to external menu save API',
      error: error.response?.data || error.message,
    });
  }
});

app.post('/api/resto/saveEmpCategory', async (req, res) => {
  try {
    const externalApiUrl = 'https://civil.skitechno.com/api/resto/saveEmpCategory';

    console.log('Incoming Employee Category Data:', req.body);

    const response = await axios.post(externalApiUrl, req.body);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error calling external employee category save API:',
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to connect to external employee category save API',
      error: error.response?.data || error.message,
    });
  }
});


app.post('/api/resto/saveCounter', async (req, res) => {
  try {
    const externalApiUrl = 'https://civil.skitechno.com/api/resto/saveCounter';

    console.log('Incoming Counter Data:', req.body);

    const response = await axios.post(externalApiUrl, req.body);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      'Error calling external counter save API:',
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to connect to external counter save API',
      error: error.response?.data || error.message,
    });
  }
});

app.post("/api/resto/saveEmployee", async (req, res) => {
  try {
    const response = await fetch("https://civil.skitechno.com/api/resto/saveEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("saveEmployee proxy error:", error);
    res.status(500).json({ error: "Failed to save employee" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});