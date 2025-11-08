import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, User, Briefcase, GraduationCap, Award, BadgeCheck, FolderOpen, Globe, Camera, X, ChevronUp, ChevronDown, Edit3 } from "lucide-react";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
    photo: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  sectionOrder: string[];
}

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  // Defensive defaults for safe operations
  const customSections = data.customSections ?? [];
  const currentSectionOrder = Array.isArray(data.sectionOrder) ? data.sectionOrder : [];
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: '',
      description: ''
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const updateSkills = (skillsText: string) => {
    const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, skills });
  };

  const addSkill = () => {
    if (data.skills.length === 0 || data.skills[data.skills.length - 1].trim() !== '') {
      onChange({ ...data, skills: [...data.skills, ''] });
    }
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data.skills];
    updated[index] = value;
    onChange({ ...data, skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index);
    onChange({ ...data, skills: updated });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updatePersonalInfo('photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: ''
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    const updated = data.certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onChange({ ...data, certifications: updated });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: string) => {
    const updated = data.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(project => project.id !== id)
    });
  };

  const addLanguage = () => {
    const newLang = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    const updated = data.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onChange({ ...data, languages: updated });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  // Custom sections management
  const addCustomSection = (sectionType: string = 'custom') => {
    const predefinedTitles: { [key: string]: string } = {
      'interests': 'Interests',
      'achievements': 'Achievements & Awards',
      'references': 'References', 
      'signature': 'Signature',
      'custom': ''
    };
    
    const newSection = {
      id: Date.now().toString(),
      title: predefinedTitles[sectionType] || '',
      content: ''
    };
    const newSectionId = `custom-${newSection.id}`;
    // Ensure new custom sections are always added at the end
    const updatedOrder = [...currentSectionOrder, newSectionId];
    onChange({
      ...data,
      customSections: [...customSections, newSection],
      sectionOrder: updatedOrder
    });
  };

  const updateCustomSection = (id: string, field: string, value: string) => {
    const updated = customSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    );
    onChange({ ...data, customSections: updated });
  };

  const removeCustomSection = (id: string) => {
    const updatedCustomSections = customSections.filter(section => section.id !== id);
    const updatedSectionOrder = currentSectionOrder.filter(sectionId => sectionId !== `custom-${id}`);
    onChange({
      ...data,
      customSections: updatedCustomSections,
      sectionOrder: normalizeOrder(updatedCustomSections, updatedSectionOrder)
    });
  };

  // Section order normalization utility
  const defaultSectionOrder = ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
  
  const normalizeOrder = (currentCustomSections: Array<{id: string}>, currentOrder: string[]) => {
    const customSectionIds = currentCustomSections.map(s => `custom-${s.id}`);
    const allValidIds = [...defaultSectionOrder, ...customSectionIds];
    
    // Filter out invalid IDs from current order
    const validExistingOrder = currentOrder.filter(id => allValidIds.includes(id));
    
    // Find missing sections
    const missingBaseIds = defaultSectionOrder.filter(id => !validExistingOrder.includes(id));
    const missingCustomIds = customSectionIds.filter(id => !validExistingOrder.includes(id));
    
    // If no missing base sections, just append missing custom sections to maintain order
    if (missingBaseIds.length === 0) {
      return [...validExistingOrder, ...missingCustomIds];
    }
    
    // Insert missing base sections in their proper position within the default order
    // while preserving the position of existing custom sections
    const result = [...validExistingOrder];
    
    // Split result into base sections and custom sections
    const baseSectionsInOrder = result.filter(id => defaultSectionOrder.includes(id));
    const customSectionsInOrder = result.filter(id => id.startsWith('custom-'));
    
    // Create a properly ordered base section list with missing ones inserted
    const completeBaseOrder = [];
    for (const baseId of defaultSectionOrder) {
      if (baseSectionsInOrder.includes(baseId) || missingBaseIds.includes(baseId)) {
        completeBaseOrder.push(baseId);
      }
    }
    
    // Combine: complete base order + existing custom sections + new custom sections
    return [...completeBaseOrder, ...customSectionsInOrder, ...missingCustomIds];
  };

  // Normalized section order for rendering
  const sectionOrder = normalizeOrder(customSections, currentSectionOrder);

  // Section ordering
  const moveSectionUp = (sectionId: string) => {
    const currentIndex = sectionOrder.indexOf(sectionId);
    if (currentIndex > 0) {
      const newOrder = [...sectionOrder];
      [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
      onChange({ ...data, sectionOrder: newOrder });
    }
  };

  const moveSectionDown = (sectionId: string) => {
    const currentIndex = sectionOrder.indexOf(sectionId);
    if (currentIndex < sectionOrder.length - 1) {
      const newOrder = [...sectionOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      onChange({ ...data, sectionOrder: newOrder });
    }
  };

  // Section controls
  const renderSectionControls = (sectionId: string) => (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => moveSectionUp(sectionId)}
        disabled={sectionOrder.indexOf(sectionId) === 0}
        className="h-6 w-6 p-0"
        title="Move Up"
        data-testid={`button-move-up-${sectionId}`}
      >
        <ChevronUp className="h-3 w-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => moveSectionDown(sectionId)}
        disabled={sectionOrder.indexOf(sectionId) === sectionOrder.length - 1}
        className="h-6 w-6 p-0"
        title="Move Down"
        data-testid={`button-move-down-${sectionId}`}
      >
        <ChevronDown className="h-3 w-3" />
      </Button>
    </div>
  );

  // Section renderers
  const renderPersonalSection = () => (
    <Card key="personal">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            Personal Information
          </CardTitle>
          {renderSectionControls('personal')}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              data-testid="input-full-name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              data-testid="input-email"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              data-testid="input-phone"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              data-testid="input-location"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/your-profile"
              data-testid="input-linkedin"
            />
          </div>
          <div>
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input
              id="website"
              value={data.personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="yourwebsite.com"
              data-testid="input-website"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">Profile Photo</Label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('photo')?.click()}
              className="flex items-center gap-2"
              data-testid="button-upload-photo"
            >
              <Camera className="h-4 w-4" />
              Upload Photo
            </Button>
            {data.personalInfo.photo && (
              <div className="flex items-center gap-2">
                <img
                  src={data.personalInfo.photo}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updatePersonalInfo('photo', '')}
                  data-testid="button-remove-photo"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <Label>Professional Summary</Label>
          <RichTextEditor
            value={data.personalInfo.summary}
            onChange={(value) => updatePersonalInfo('summary', value)}
            data-testid="textarea-summary"
            className="min-h-20"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderExperienceSection = () => (
    <Card key="experience">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('experience')}
            <Button size="sm" onClick={addExperience} data-testid="button-add-experience" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Experience {index + 1}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeExperience(exp.id)}
                data-testid={`button-remove-experience-${index}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                data-testid={`input-experience-title-${index}`}
              />
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                data-testid={`input-experience-company-${index}`}
              />
            </div>
            <Input
              placeholder="Duration (e.g., Jan 2020 - Present)"
              value={exp.duration}
              onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
              data-testid={`input-experience-duration-${index}`}
            />
            <div>
              <Label>Job Description & Achievements</Label>
              <RichTextEditor
                value={exp.description}
                onChange={(value) => updateExperience(exp.id, 'description', value)}
                placeholder="Job description and achievements..."
                data-testid={`textarea-experience-description-${index}`}
                className="min-h-16"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderEducationSection = () => (
    <Card key="education">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="h-4 w-4" />
            Education
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('education')}
            <Button size="sm" onClick={addEducation} data-testid="button-add-education" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.education.map((edu, index) => (
          <div key={edu.id} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Education {index + 1}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeEducation(edu.id)}
                data-testid={`button-remove-education-${index}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                data-testid={`input-education-degree-${index}`}
              />
              <Input
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                data-testid={`input-education-school-${index}`}
              />
            </div>
            <Input
              placeholder="Year (e.g., 2020-2024)"
              value={edu.year}
              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
              data-testid={`input-education-year-${index}`}
            />
            <div>
              <Label>Additional Details (optional)</Label>
              <RichTextEditor
                value={edu.description}
                onChange={(value) => updateEducation(edu.id, 'description', value)}
                placeholder="Additional details (optional)..."
                data-testid={`textarea-education-description-${index}`}
                className="min-h-16"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderSkillsSection = () => (
    <Card key="skills">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="h-4 w-4" />
            Skills
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('skills')}
            <Button size="sm" onClick={addSkill} data-testid="button-add-skill" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder="Skill"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              data-testid={`input-skill-${index}`}
              className="flex-1"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeSkill(index)}
              data-testid={`button-remove-skill-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="pt-2">
          <Label>Or add multiple skills (comma-separated)</Label>
          <Textarea
            placeholder="JavaScript, React, Node.js, Python..."
            onChange={(e) => updateSkills(e.target.value)}
            data-testid="textarea-skills-bulk"
            className="min-h-16"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderCertificationsSection = () => (
    <Card key="certifications">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <BadgeCheck className="h-4 w-4" />
            Certifications
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('certifications')}
            <Button size="sm" onClick={addCertification} data-testid="button-add-certification" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.certifications.map((cert, index) => (
          <div key={cert.id} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Certification {index + 1}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeCertification(cert.id)}
                data-testid={`button-remove-certification-${index}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                data-testid={`input-certification-name-${index}`}
              />
              <Input
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                data-testid={`input-certification-issuer-${index}`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Issue Date"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                data-testid={`input-certification-date-${index}`}
              />
              <Input
                placeholder="Expiry Date (optional)"
                value={cert.expiryDate}
                onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                data-testid={`input-certification-expiry-${index}`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderProjectsSection = () => (
    <Card key="projects">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <FolderOpen className="h-4 w-4" />
            Projects
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('projects')}
            <Button size="sm" onClick={addProject} data-testid="button-add-project" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.projects.map((project, index) => (
          <div key={project.id} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Project {index + 1}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeProject(project.id)}
                data-testid={`button-remove-project-${index}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
              data-testid={`input-project-name-${index}`}
            />
            <Textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              data-testid={`textarea-project-description-${index}`}
              className="min-h-16"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                data-testid={`input-project-technologies-${index}`}
              />
              <Input
                placeholder="Project Link (optional)"
                value={project.link}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                data-testid={`input-project-link-${index}`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderLanguagesSection = () => (
    <Card key="languages">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" />
            Languages
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls('languages')}
            <Button size="sm" onClick={addLanguage} data-testid="button-add-language" className="ml-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.languages.map((lang, index) => (
          <div key={lang.id} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Language {index + 1}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeLanguage(lang.id)}
                data-testid={`button-remove-language-${index}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Language"
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                data-testid={`input-language-name-${index}`}
              />
              <Input
                placeholder="Proficiency Level"
                value={lang.proficiency}
                onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                data-testid={`input-language-proficiency-${index}`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderCustomSection = (section: { id: string; title: string; content: string }) => (
    <Card key={`custom-${section.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Edit3 className="h-4 w-4" />
            {section.title || 'Custom Section'}
          </CardTitle>
          <div className="flex items-center gap-1">
            {renderSectionControls(`custom-${section.id}`)}
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeCustomSection(section.id)}
              className="h-6 w-6 p-0 ml-1"
              title="Remove Section"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Section Title</Label>
          <Input
            value={section.title}
            onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
            placeholder="Enter section title..."
            data-testid={`input-custom-section-title-${section.id}`}
          />
        </div>
        <div>
          <Label>Content</Label>
          <RichTextEditor
            value={section.content}
            onChange={(value) => updateCustomSection(section.id, 'content', value)}
            placeholder="Enter section content..."
            className="min-h-20"
          />
        </div>
      </CardContent>
    </Card>
  );

  // Dynamic section rendering
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return renderPersonalSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      case 'certifications':
        return renderCertificationsSection();
      case 'projects':
        return renderProjectsSection();
      case 'languages':
        return renderLanguagesSection();
      default:
        if (sectionId.startsWith('custom-')) {
          const customId = sectionId.replace('custom-', '');
          const customSection = customSections.find(s => s.id === customId);
          return customSection ? renderCustomSection(customSection) : null;
        }
        return null;
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Dynamic section rendering based on order */}
        {sectionOrder.map(sectionId => renderSection(sectionId))}
        
        {/* Add Custom Section Options */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-3">Add Section</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => addCustomSection('interests')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start"
                  data-testid="button-add-interests"
                >
                  <Plus className="h-3 w-3" />
                  Interests
                </Button>
                <Button 
                  onClick={() => addCustomSection('achievements')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start"
                  data-testid="button-add-achievements"
                >
                  <Plus className="h-3 w-3" />
                  Achievements & Awards
                </Button>
                <Button 
                  onClick={() => addCustomSection('references')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start"
                  data-testid="button-add-references"
                >
                  <Plus className="h-3 w-3" />
                  References
                </Button>
                <Button 
                  onClick={() => addCustomSection('signature')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start"
                  data-testid="button-add-signature"
                >
                  <Plus className="h-3 w-3" />
                  Signature
                </Button>
              </div>
              <Button 
                onClick={() => addCustomSection('custom')} 
                variant="outline" 
                className="w-full flex items-center gap-2 mt-3"
                data-testid="button-add-custom-section"
              >
                <Plus className="h-4 w-4" />
                Custom Section
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}