export  const getFileName = (filePath?: string) => {
  if (!filePath) return "-";
  
  // Extract the filename from the path
  const fileName = filePath.split(/[/\\]/).pop();
  
  if (!fileName) return "-";
  
  // Remove the "mouFile-" prefix if it exists
  const cleanFileName = fileName.replace(/^mouFile-/, '');
  
  return cleanFileName;
};