"use client";
 
import { useTheme } from '@/contexts/ThemeContext';
import { NotionRenderer } from "react-notion-x";
 
interface RendererProps {
  recordMap: any;
}
 
export const Renderer = ({ recordMap }: RendererProps) => {
  const { isDark } = useTheme();
  
  return (
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={isDark}
      />
  );
};
 
export default Renderer;