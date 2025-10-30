document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const urlInput = document.getElementById('url-input');
    const results = document.getElementById('results');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
    const previewContent = document.getElementById('preview-content');
    const previewUrl = document.getElementById('preview-url');
    
    // Sample safe and unsafe URLs for demonstration
    const safeUrls = [
        'https://example.com',
        'https://google.com',
        'https://github.com',
        'https://wikipedia.org'
    ];
    
    const suspiciousUrls = [
        'http://secure-paypal-login.com',
        'https://facebook-verify-account.net',
        'http://amazon-security-update.xyz'
    ];
    
    analyzeBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        
        if (!url) {
            alert('Please enter a URL to analyze');
            return;
        }
        
        // Show loading state
        results.style.display = 'block';
        results.className = 'results warning';
        resultTitle.textContent = 'Analyzing...';
        resultText.textContent = 'Please wait while we analyze the URL for potential threats.';
        
        // Simulate API call delay
        setTimeout(function() {
            analyzeUrl(url);
        }, 1500);
    });
    
    function analyzeUrl(url) {
        // For demonstration purposes, we'll use simple pattern matching
        // In a real application, this would be replaced with actual API calls
        
        let isSafe = true;
        let riskLevel = 'low';
        let message = 'This website appears to be safe based on our analysis.';
        
        // Check if URL is in suspicious list
        if (suspiciousUrls.some(suspicious => url.includes(suspicious.replace('https://', '').replace('http://', '')))) {
            isSafe = false;
            riskLevel = 'high';
            message = 'WARNING: This website has characteristics commonly associated with phishing attempts.';
        } 
        // Check if URL uses HTTP instead of HTTPS
        else if (url.startsWith('http://') && !url.startsWith('https://')) {
            isSafe = false;
            riskLevel = 'medium';
            message = 'CAUTION: This website does not use HTTPS encryption, which may pose security risks.';
        }
        // Check for suspicious keywords in domain
        else if (/(login|verify|secure|account|update|banking|paypal|facebook|amazon)/i.test(url) && 
                 !safeUrls.some(safe => url.includes(safe.replace('https://', '')))) {
            isSafe = false;
            riskLevel = 'medium';
            message = 'This website contains suspicious keywords. Proceed with caution.';
        }
        
        // Update UI based on analysis
        updateResults(isSafe, riskLevel, message, url);
        updatePreview(url, isSafe);
    }
    
    function updateResults(isSafe, riskLevel, message, url) {
        results.style.display = 'block';
        
        if (riskLevel === 'high') {
            results.className = 'results danger';
            resultTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> High Risk Detected';
        } else if (riskLevel === 'medium') {
            results.className = 'results warning';
            resultTitle.innerHTML = '<i class="fas fa-exclamation-circle"></i> Medium Risk Detected';
        } else {
            results.className = 'results safe';
            resultTitle.innerHTML = '<i class="fas fa-check-circle"></i> Safe Website';
        }
        
        resultText.textContent = message;
        
        // Update details based on analysis
        document.getElementById('domain-info').textContent = extractDomain(url);
        document.getElementById('ssl-info').textContent = url.startsWith('https://') ? 'Valid' : 'None';
        document.getElementById('reputation-info').textContent = isSafe ? 'Good' : 'Poor';
        document.getElementById('blacklist-info').textContent = isSafe ? 'Not listed' : 'Potentially listed';
    }
    
    function extractDomain(url) {
        // Simple domain extraction for demo
        return url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
    }
    
    function updatePreview(url, isSafe) {
        previewUrl.textContent = url;
        
        // In a real application, you would use an iframe or server-side proxy
        // For this demo, we'll show simulated content
        if (isSafe) {
            previewContent.innerHTML = `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h1 style="color: #2d3748; margin-bottom: 15px;">Welcome to ${extractDomain(url)}</h1>
                    <p style="margin-bottom: 15px;">This is a simulated preview of the website content. In a real application, this would display the actual website.</p>
                    <div style="background: #f7fafc; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                        <h3 style="color: #4a5568; margin-bottom: 10px;">Website Features:</h3>
                        <ul style="color: #718096;">
                            <li>Secure connection (HTTPS)</li>
                            <li>Professional design</li>
                            <li>Clear contact information</li>
                        </ul>
                    </div>
                    <p style="color: #38a169; font-weight: bold;">✓ This website has been verified as safe by PhishGuard.</p>
                </div>
            `;
        } else {
            previewContent.innerHTML = `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h1 style="color: #c53030; margin-bottom: 15px;">Security Warning</h1>
                    <p style="margin-bottom: 15px; color: #e53e3e;">This website has been flagged as potentially dangerous by PhishGuard.</p>
                    <div style="background: #fed7d7; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                        <h3 style="color: #c53030; margin-bottom: 10px;">Potential Risks:</h3>
                        <ul style="color: #e53e3e;">
                            <li>Phishing attempts to steal personal information</li>
                            <li>Malicious software distribution</li>
                            <li>Financial fraud</li>
                        </ul>
                    </div>
                    <p style="color: #e53e3e; font-weight: bold;">⚠ We recommend not entering any personal information on this website.</p>
                </div>
            `;
        }
    }
    
    // Add example URLs for quick testing
    urlInput.addEventListener('focus', function() {
        if (!this.dataset.examplesAdded) {
            this.placeholder = "Try: https://example.com or http://secure-paypal-login.com";
            this.dataset.examplesAdded = true;
        }
    });
});
