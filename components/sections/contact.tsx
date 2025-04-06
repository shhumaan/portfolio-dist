"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Linkedin, Github, Send, ExternalLink, Clock, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import contactData from "@/data/contact.json" // Import contact data

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentTime, setCurrentTime] = useState<string>("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [aiTyping, setAiTyping] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [responseTime, setResponseTime] = useState("24 hours")

  // Get current time in user's timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      
      // Set expected response time based on day of week and time
      const hour = now.getHours()
      const day = now.getDay() // 0 = Sunday, 6 = Saturday
      
      if (day === 0 || day === 6) {
        setResponseTime("24-48 hours")
      } else if (hour < 8 || hour > 18) {
        setResponseTime("12-24 hours")
      } else {
        setResponseTime("3-6 hours")
      }
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting
  const messageValue = form.watch("message")
  const nameValue = form.watch("name")

  async function onSubmit(data: FormValues) {
    try {
      // In a real implementation, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(data)
      setFormSubmitted(true)
      
      // Simulate AI typing response
      setAiTyping(true)
      
      // Choose a random response message from the JSON data
      const responseMessages = contactData.successMessage.responseMessages
      const responseMessage = responseMessages[Math.floor(Math.random() * responseMessages.length)]
      
      // Simulate typing effect
      let displayedResponse = ""
      for (let i = 0; i < responseMessage.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30))
        displayedResponse += responseMessage[i]
        setAiResponse(displayedResponse)
      }
      
      setAiTyping(false)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        form.reset()
        setFormSubmitted(false)
        setAiResponse("")
      }, 5000)
      
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Hover animations for buttons and inputs
  const hoverScale = {
    scale: 1.02,
    transition: { duration: 0.2 }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-emerald/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-emerald/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium mb-4">
              {contactData.section.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{contactData.section.title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{contactData.section.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-3 bg-elevation-2 rounded-xl border border-elevation-1 shadow-lg p-8"
            >
              <h3 className="text-xl font-bold mb-6 text-cream">{contactData.form.title}</h3>
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cream/90">{contactData.form.fields.name.label}</FormLabel>
                                <FormControl>
                                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Input 
                                      placeholder={contactData.form.fields.name.placeholder} 
                                      {...field} 
                                      className="bg-elevation-3 border-elevation-1 focus:border-emerald/50 focus:ring-emerald/20 transition-all duration-300 hover:border-emerald/30" 
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage className="text-[#ff6b6b]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cream/90">{contactData.form.fields.email.label}</FormLabel>
                                <FormControl>
                                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Input 
                                      placeholder={contactData.form.fields.email.placeholder} 
                                      {...field} 
                                      className="bg-elevation-3 border-elevation-1 focus:border-emerald/50 focus:ring-emerald/20 transition-all duration-300 hover:border-emerald/30"
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage className="text-[#ff6b6b]" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-cream/90">{contactData.form.fields.subject.label}</FormLabel>
                              <FormControl>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                  <Input 
                                    placeholder={contactData.form.fields.subject.placeholder} 
                                    {...field} 
                                    className="bg-elevation-3 border-elevation-1 focus:border-emerald/50 focus:ring-emerald/20 transition-all duration-300 hover:border-emerald/30"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage className="text-[#ff6b6b]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-cream/90">{contactData.form.fields.message.label}</FormLabel>
                              <FormControl>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                  <Textarea 
                                    placeholder={contactData.form.fields.message.placeholder} 
                                    className="min-h-40 bg-elevation-3 border-elevation-1 focus:border-emerald/50 focus:ring-emerald/20 transition-all duration-300 hover:border-emerald/30" 
                                    {...field} 
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage className="text-[#ff6b6b]" />
                            </FormItem>
                          )}
                        />

                        {/* Message Preview */}
                        {messageValue && messageValue.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-lg bg-elevation-3/80 border border-elevation-1"
                          >
                            <div className="flex items-center mb-2">
                              <MessageSquare className="h-4 w-4 text-emerald mr-2" />
                              <h4 className="text-sm font-medium text-cream/90">{contactData.form.preview.title}</h4>
                            </div>
                            <div className="flex">
                              <div className="w-8 h-8 rounded-full bg-emerald/20 flex-shrink-0 flex items-center justify-center mr-3 text-xs font-medium text-emerald">
                                {nameValue ? nameValue.charAt(0).toUpperCase() : "A"}
                              </div>
                              <div className="bg-elevation-4 rounded-lg p-3 text-sm text-cream/80">
                                {messageValue.length > 150 ? messageValue.substring(0, 150) + "..." : messageValue}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <motion.div 
                          whileHover={hoverScale} 
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full bg-emerald hover:bg-emerald/90 text-deep-teal font-medium py-3 shadow-[0_2px_10px_rgba(6,214,160,0.3)] transition-all duration-300" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <span className="mr-2">{contactData.form.buttons.sending}</span>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </span>
                            ) : (
                              <span className="flex items-center justify-center group">
                                <span className="mr-2 group-hover:mr-3 transition-all duration-300">{contactData.form.buttons.submit}</span>
                                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald/10 rounded-lg border border-emerald/20 p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="h-8 w-8 text-emerald" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-cream mb-2">{contactData.successMessage.title}</h4>
                    
                    {/* AI Response */}
                    <div className="mt-6 p-4 rounded-lg bg-elevation-3 mb-4 text-left">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-emerald/10 flex-shrink-0 flex items-center justify-center text-emerald mr-3">
                          A
                        </div>
                        <div>
                          <p className="text-sm text-cream/90 mb-1">Anshuman</p>
                          <div className="bg-elevation-4 rounded-lg p-3">
                            {aiTyping ? (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 rounded-full bg-emerald/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                <div className="w-2 h-2 rounded-full bg-emerald/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                <div className="w-2 h-2 rounded-full bg-emerald/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                              </div>
                            ) : (
                              <p className="text-cream/80">{aiResponse}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col justify-start gap-8">
              <div className="bg-elevation-2 rounded-xl border border-elevation-1 shadow-lg p-8 h-auto mb-8">
                <h3 className="text-xl font-bold mb-6 text-cream">{contactData.contactInfo.title}</h3>

                <div className="space-y-8">
                  <motion.div className="flex items-start group" whileHover={hoverScale}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center mr-4 group-hover:bg-emerald/20 transition-colors">
                      <Mail className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-cream">{contactData.contactInfo.email.label}</h4>
                      <a
                        href={`mailto:${contactData.contactInfo.email.value}`}
                        className="text-soft-cream/80 hover:text-emerald transition-colors flex items-center group-hover:underline"
                      >
                        {contactData.contactInfo.email.value}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start group" whileHover={hoverScale}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center mr-4 group-hover:bg-emerald/20 transition-colors">
                      <Linkedin className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-cream">{contactData.contactInfo.linkedin.label}</h4>
                      <a
                        href={contactData.contactInfo.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-soft-cream/80 hover:text-emerald transition-colors flex items-center group-hover:underline"
                      >
                        <span>{contactData.contactInfo.linkedin.value}</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start group" whileHover={hoverScale}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center mr-4 group-hover:bg-emerald/20 transition-colors">
                      <Github className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-cream">{contactData.contactInfo.github.label}</h4>
                      <a
                        href={contactData.contactInfo.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-soft-cream/80 hover:text-emerald transition-colors flex items-center group-hover:underline"
                      >
                        <span>{contactData.contactInfo.github.value}</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="bg-elevation-2 rounded-xl border border-elevation-1 shadow-lg p-8 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-cream">{contactData.availability.title}</h3>
                  
                  {/* Current time display */}
                  <div className="flex items-center text-sm text-emerald">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{currentTime}</span>
                  </div>
                </div>
                <p className="text-soft-cream/80 mb-4">
                  {contactData.availability.description}
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium w-fit">
                    {contactData.availability.status}
                  </div>
                  <div className="text-xs text-soft-cream/60 flex items-center mt-2">
                    <Clock className="h-3 w-3 mr-1 text-emerald/70" />
                    <span>{contactData.availability.responseTimePrefix} {responseTime}</span>
                  </div>
                </div>
                
                {/* Decorative gradient */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-emerald/5 blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

