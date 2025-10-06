//THIS IS A GENERATED FILE FROM SUPABASE, IT CAN
//BE UPDATED WITH THE SUPABASE CLI OR THROUGH 
//THE SUPABASE WEB APP IN THE 'API DOCS' SIDEBAR SECTION

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      axis_survey_questions: {
        Row: {
          axis_id: string
          created_at: string
          id: string
          is_active: boolean | null
          question_text: string
          question_type: string
          scale_max: number | null
          scale_min: number | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          axis_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question_text: string
          question_type?: string
          scale_max?: number | null
          scale_min?: number | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          axis_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          question_text?: string
          question_type?: string
          scale_max?: number | null
          scale_min?: number | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "axis_survey_questions_axis_id_fkey"
            columns: ["axis_id"]
            isOneToOne: false
            referencedRelation: "worldview_axes"
            referencedColumns: ["id"]
          },
        ]
      }
      event_actors: {
        Row: {
          confidence: number
          created_at: string
          event_id: string
          figure_id: string
          id: string
          role: string | null
          stance: string
          stance_blurb: string
          updated_at: string
        }
        Insert: {
          confidence: number
          created_at?: string
          event_id: string
          figure_id: string
          id?: string
          role?: string | null
          stance: string
          stance_blurb: string
          updated_at?: string
        }
        Update: {
          confidence?: number
          created_at?: string
          event_id?: string
          figure_id?: string
          id?: string
          role?: string | null
          stance?: string
          stance_blurb?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_actors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_actors_figure_id_fkey"
            columns: ["figure_id"]
            isOneToOne: false
            referencedRelation: "figures"
            referencedColumns: ["id"]
          },
        ]
      }
      event_updates: {
        Row: {
          action_type: string
          created_at: string
          event_id: string
          excerpt: string | null
          figure_id: string | null
          id: string
          published_at: string
          source_outlet: string
          source_url: string
          summary: string
          updated_at: string
        }
        Insert: {
          action_type: string
          created_at?: string
          event_id: string
          excerpt?: string | null
          figure_id?: string | null
          id?: string
          published_at: string
          source_outlet: string
          source_url: string
          summary: string
          updated_at?: string
        }
        Update: {
          action_type?: string
          created_at?: string
          event_id?: string
          excerpt?: string | null
          figure_id?: string | null
          id?: string
          published_at?: string
          source_outlet?: string
          source_url?: string
          summary?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_updates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_updates_figure_id_fkey"
            columns: ["figure_id"]
            isOneToOne: false
            referencedRelation: "figures"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          id: string
          last_updated: string
          location: string | null
          name: string
          slug: string
          summary: string
          tags: string[] | null
          time_window_end: string | null
          time_window_start: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated?: string
          location?: string | null
          name: string
          slug: string
          summary: string
          tags?: string[] | null
          time_window_end?: string | null
          time_window_start?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_updated?: string
          location?: string | null
          name?: string
          slug?: string
          summary?: string
          tags?: string[] | null
          time_window_end?: string | null
          time_window_start?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      figure_axis_scores: {
        Row: {
          axis_id: string
          confidence_level: string | null
          created_at: string
          editorial_score: number | null
          figure_id: string
          final_score: number
          id: string
          last_calculated_at: string
          llm_score: number | null
          scoring_method: string
          updated_at: string
          user_average_score: number | null
          user_response_count: number | null
        }
        Insert: {
          axis_id: string
          confidence_level?: string | null
          created_at?: string
          editorial_score?: number | null
          figure_id: string
          final_score: number
          id?: string
          last_calculated_at?: string
          llm_score?: number | null
          scoring_method?: string
          updated_at?: string
          user_average_score?: number | null
          user_response_count?: number | null
        }
        Update: {
          axis_id?: string
          confidence_level?: string | null
          created_at?: string
          editorial_score?: number | null
          figure_id?: string
          final_score?: number
          id?: string
          last_calculated_at?: string
          llm_score?: number | null
          scoring_method?: string
          updated_at?: string
          user_average_score?: number | null
          user_response_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "figure_axis_scores_axis_id_fkey"
            columns: ["axis_id"]
            isOneToOne: false
            referencedRelation: "worldview_axes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "figure_axis_scores_figure_id_fkey"
            columns: ["figure_id"]
            isOneToOne: false
            referencedRelation: "figures"
            referencedColumns: ["id"]
          },
        ]
      }
      figures: {
        Row: {
          birth_year: number | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location: string | null
          name: string
          title: string
          updated_at: string
        }
        Insert: {
          birth_year?: number | null
          category: string
          created_at?: string
          description?: string | null
          id: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          name: string
          title: string
          updated_at?: string
        }
        Update: {
          birth_year?: number | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          name?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      generated_profiles: {
        Row: {
          created_at: string | null
          figure_id: string | null
          generated_by: string | null
          id: string
          profile_data: Json
          sources_used: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          figure_id?: string | null
          generated_by?: string | null
          id?: string
          profile_data: Json
          sources_used?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          figure_id?: string | null
          generated_by?: string | null
          id?: string
          profile_data?: Json
          sources_used?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      influence_scores: {
        Row: {
          created_at: string
          decision_impact: number | null
          figure_id: string
          id: string
          momentum: number | null
          network_alliances: number | null
          overall_score: number
          position_power: number | null
          reach_audience: number | null
          score_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          decision_impact?: number | null
          figure_id: string
          id?: string
          momentum?: number | null
          network_alliances?: number | null
          overall_score: number
          position_power?: number | null
          reach_audience?: number | null
          score_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          decision_impact?: number | null
          figure_id?: string
          id?: string
          momentum?: number | null
          network_alliances?: number | null
          overall_score?: number
          position_power?: number | null
          reach_audience?: number | null
          score_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      kg_affiliations: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          org_name: string
          person_id: string
          role: string
          source_id: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          org_name: string
          person_id: string
          role: string
          source_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          org_name?: string
          person_id?: string
          role?: string
          source_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kg_affiliations_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_affiliations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "kg_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      kg_axis_scores: {
        Row: {
          axis: Database["public"]["Enums"]["kg_axis"]
          created_at: string
          created_by: string | null
          id: string
          person_id: string
          score: number | null
          source_id: string | null
          updated_at: string
        }
        Insert: {
          axis: Database["public"]["Enums"]["kg_axis"]
          created_at?: string
          created_by?: string | null
          id?: string
          person_id: string
          score?: number | null
          source_id?: string | null
          updated_at?: string
        }
        Update: {
          axis?: Database["public"]["Enums"]["kg_axis"]
          created_at?: string
          created_by?: string | null
          id?: string
          person_id?: string
          score?: number | null
          source_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kg_axis_scores_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_axis_scores_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "kg_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      kg_claims: {
        Row: {
          confidence: number
          created_at: string
          created_by: string | null
          id: string
          person_id: string
          property: string
          source_id: string | null
          updated_at: string
          value: Json
        }
        Insert: {
          confidence?: number
          created_at?: string
          created_by?: string | null
          id?: string
          person_id: string
          property: string
          source_id?: string | null
          updated_at?: string
          value: Json
        }
        Update: {
          confidence?: number
          created_at?: string
          created_by?: string | null
          id?: string
          person_id?: string
          property?: string
          source_id?: string | null
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "kg_claims_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_claims_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "kg_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      kg_milestones: {
        Row: {
          created_at: string
          created_by: string | null
          date: string | null
          description: string | null
          id: string
          label: string
          person_id: string
          source_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
          label: string
          person_id: string
          source_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
          label?: string
          person_id?: string
          source_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kg_milestones_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_milestones_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "kg_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      kg_persons: {
        Row: {
          country: string | null
          created_at: string
          created_by: string | null
          field: string | null
          full_name: string
          id: string
          photo_url: string | null
          short_title: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          created_by?: string | null
          field?: string | null
          full_name: string
          id?: string
          photo_url?: string | null
          short_title?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          created_by?: string | null
          field?: string | null
          full_name?: string
          id?: string
          photo_url?: string | null
          short_title?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      kg_relationships: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          from_person_id: string
          id: string
          source_id: string | null
          start_date: string | null
          to_person_id: string
          type: Database["public"]["Enums"]["kg_reltype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          from_person_id: string
          id?: string
          source_id?: string | null
          start_date?: string | null
          to_person_id: string
          type: Database["public"]["Enums"]["kg_reltype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          from_person_id?: string
          id?: string
          source_id?: string | null
          start_date?: string | null
          to_person_id?: string
          type?: Database["public"]["Enums"]["kg_reltype"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kg_relationships_from_person_id_fkey"
            columns: ["from_person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "kg_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kg_relationships_to_person_id_fkey"
            columns: ["to_person_id"]
            isOneToOne: false
            referencedRelation: "kg_persons"
            referencedColumns: ["id"]
          },
        ]
      }
      kg_sources: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          published_at: string | null
          publisher: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          publisher?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          publisher?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      landmark_moments: {
        Row: {
          created_at: string
          description: string
          figure_id: string
          id: string
          title: string
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          figure_id: string
          id?: string
          title: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          figure_id?: string
          id?: string
          title?: string
          year?: number
        }
        Relationships: []
      }
      leader_catalog: {
        Row: {
          active: boolean
          build_interval_days: number
          last_built: string | null
          seed_urls: string[]
          slug: string
          subject: string
        }
        Insert: {
          active?: boolean
          build_interval_days?: number
          last_built?: string | null
          seed_urls?: string[]
          slug: string
          subject: string
        }
        Update: {
          active?: boolean
          build_interval_days?: number
          last_built?: string | null
          seed_urls?: string[]
          slug?: string
          subject?: string
        }
        Relationships: []
      }
      leader_profiles: {
        Row: {
          profile: Json
          slug: string
          subject: string
          updated_at: string
        }
        Insert: {
          profile: Json
          slug: string
          subject: string
          updated_at?: string
        }
        Update: {
          profile?: Json
          slug?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      perception_data: {
        Row: {
          category: string
          created_at: string
          figure_id: string
          id: string
          perception_type: string
          points: string[]
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          figure_id: string
          id?: string
          perception_type: string
          points: string[]
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          figure_id?: string
          id?: string
          perception_type?: string
          points?: string[]
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          axis_id: string | null
          created_at: string
          figure_id: string
          id: string
          question_id: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          axis_id?: string | null
          created_at?: string
          figure_id: string
          id?: string
          question_id: string
          updated_at?: string
          user_id: string
          value: number
        }
        Update: {
          axis_id?: string | null
          created_at?: string
          figure_id?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_axis_id_fkey"
            columns: ["axis_id"]
            isOneToOne: false
            referencedRelation: "worldview_axes"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_actors: {
        Row: {
          blurb: string
          confidence: number
          created_at: string
          figure_id: string
          id: string
          priority: number
          stance: string
          topic_id: string
          updated_at: string
        }
        Insert: {
          blurb: string
          confidence: number
          created_at?: string
          figure_id: string
          id?: string
          priority?: number
          stance: string
          topic_id: string
          updated_at?: string
        }
        Update: {
          blurb?: string
          confidence?: number
          created_at?: string
          figure_id?: string
          id?: string
          priority?: number
          stance?: string
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_actors_figure_id_fkey"
            columns: ["figure_id"]
            isOneToOne: false
            referencedRelation: "figures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_actors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_events: {
        Row: {
          created_at: string
          event_id: string
          id: string
          topic_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          topic_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_events_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_nuances: {
        Row: {
          counterpoints: Json | null
          created_at: string
          editor_priority: number
          evidence: Json
          evidence_tag: string
          explanation: string
          id: string
          scope_tag: string
          title: string
          topic_id: string
          updated_at: string
        }
        Insert: {
          counterpoints?: Json | null
          created_at?: string
          editor_priority?: number
          evidence?: Json
          evidence_tag: string
          explanation: string
          id?: string
          scope_tag: string
          title: string
          topic_id: string
          updated_at?: string
        }
        Update: {
          counterpoints?: Json | null
          created_at?: string
          editor_priority?: number
          evidence?: Json
          evidence_tag?: string
          explanation?: string
          id?: string
          scope_tag?: string
          title?: string
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_nuances_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          core_questions: string[] | null
          created_at: string
          domain: string | null
          id: string
          last_updated: string
          overview: string
          slug: string
          tags: string[] | null
          title: string
          topic_axes: string[] | null
          updated_at: string
        }
        Insert: {
          core_questions?: string[] | null
          created_at?: string
          domain?: string | null
          id?: string
          last_updated?: string
          overview: string
          slug: string
          tags?: string[] | null
          title: string
          topic_axes?: string[] | null
          updated_at?: string
        }
        Update: {
          core_questions?: string[] | null
          created_at?: string
          domain?: string | null
          id?: string
          last_updated?: string
          overview?: string
          slug?: string
          tags?: string[] | null
          title?: string
          topic_axes?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      track_record: {
        Row: {
          category: string
          created_at: string
          description: string | null
          figure_id: string
          id: string
          impact_level: string | null
          title: string
          year: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          figure_id: string
          id?: string
          impact_level?: string | null
          title: string
          year: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          figure_id?: string
          id?: string
          impact_level?: string | null
          title?: string
          year?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      watchlists: {
        Row: {
          created_at: string
          figure_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          figure_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          figure_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      worldview_axes: {
        Row: {
          created_at: string
          definition: string
          domain: string
          high_end_description: string
          high_end_examples: string[] | null
          high_end_label: string
          id: string
          low_end_description: string
          low_end_examples: string[] | null
          low_end_label: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          definition: string
          domain: string
          high_end_description: string
          high_end_examples?: string[] | null
          high_end_label: string
          id: string
          low_end_description: string
          low_end_examples?: string[] | null
          low_end_label: string
          name: string
          sort_order: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          definition?: string
          domain?: string
          high_end_description?: string
          high_end_examples?: string[] | null
          high_end_label?: string
          id?: string
          low_end_description?: string
          low_end_examples?: string[] | null
          low_end_label?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      kg_axis:
        | "Globalism"
        | "AIRegulation"
        | "Individualism"
        | "ClimateAction"
        | "TechSkepticism"
        | "CivilLiberties"
        | "MarketLiberalism"
        | "SecurityHawk"
        | "ImmigrationOpenness"
        | "Multilateralism"
      kg_reltype:
        | "Ally"
        | "Opponent"
        | "WorkedAt"
        | "BoardMember"
        | "InvestorIn"
        | "MentorOf"
        | "CoFounderWith"
        | "SamePartyAs"
        | "Endorsed"
        | "Criticized"
        | "SuccessorOf"
        | "PredecessorOf"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "user"],
      kg_axis: [
        "Globalism",
        "AIRegulation",
        "Individualism",
        "ClimateAction",
        "TechSkepticism",
        "CivilLiberties",
        "MarketLiberalism",
        "SecurityHawk",
        "ImmigrationOpenness",
        "Multilateralism",
      ],
      kg_reltype: [
        "Ally",
        "Opponent",
        "WorkedAt",
        "BoardMember",
        "InvestorIn",
        "MentorOf",
        "CoFounderWith",
        "SamePartyAs",
        "Endorsed",
        "Criticized",
        "SuccessorOf",
        "PredecessorOf",
      ],
    },
  },
} as const
