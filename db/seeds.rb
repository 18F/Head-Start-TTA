# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alonGrantee Specialistide the database with db:setup).

GranteeRole.find_or_create_by title: "CEO"
GranteeRole.find_or_create_by title: "Chief Financial Officer"
GranteeRole.find_or_create_by title: "Executive Director / Program Director"
GranteeRole.find_or_create_by title: "Governing Body / Tribal Council"
GranteeRole.find_or_create_by title: "Management Staff"
GranteeRole.find_or_create_by title: "Policy Council"
GranteeRole.find_or_create_by title: "Other"

# Create base topics
Topic.find_or_create_by scope: "Grantee Specialist", name: "Communication"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Disabilities"
Topic.find_or_create_by scope: "Grantee Specialist", name: "ERSEA"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Facilities and Properties"
fm = Topic.find_or_create_by scope: "Grantee Specialist", name: "Financial Management"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Cost Allocation", parent: fm
Topic.find_or_create_by scope: "Grantee Specialist", name: "Cost Principles", parent: fm
Topic.find_or_create_by scope: "Grantee Specialist", name: "Nonfederal Share", parent: fm
Topic.find_or_create_by scope: "Grantee Specialist", name: "Personnel Compensation", parent: fm
Topic.find_or_create_by scope: "Grantee Specialist", name: "Other", parent: fm
Topic.find_or_create_by scope: "Grantee Specialist", name: "Health"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Human Resources"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Leadership"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Mental Health"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Nutrition"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Ongoing Monitoring"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Program Governance"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Program Planning"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Record Keeping"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Reporting"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Safe Environments"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Transportation"
Topic.find_or_create_by scope: "Grantee Specialist", name: "Other"

Topic.find_or_create_by scope: "Early Childhood Specialist", name: "Collaborations/Partnerships"
Topic.find_or_create_by scope: "Early Childhood Specialist", name: "Parent and Family Engagement"
Topic.find_or_create_by scope: "Early Childhood Specialist", name: "Professional Development"
Topic.find_or_create_by scope: "Early Childhood Specialist", name: "School Readiness"
Topic.find_or_create_by scope: "Early Childhood Specialist", name: "Other"

Topic.find_or_create_by scope: "Health Specialist", name: "Child Health Status"
Topic.find_or_create_by scope: "Health Specialist", name: "Child Nutrition"
Topic.find_or_create_by scope: "Health Specialist", name: "Health Service Management"
Topic.find_or_create_by scope: "Health Specialist", name: "Health Service Managers"
Topic.find_or_create_by scope: "Health Specialist", name: "Mental Health"
Topic.find_or_create_by scope: "Health Specialist", name: "Oral Health"
Topic.find_or_create_by scope: "Health Specialist", name: "Parent Engagement"
Topic.find_or_create_by scope: "Health Specialist", name: "Physical Development"
Topic.find_or_create_by scope: "Health Specialist", name: "Safety"
Topic.find_or_create_by scope: "Health Specialist", name: "Other"

Topic.find_or_create_by scope: "Systems Specialist", name: "Cross System Coordination"
Topic.find_or_create_by scope: "Systems Specialist", name: "Linking TTA Resources and Training"
Topic.find_or_create_by scope: "Systems Specialist", name: "TA for TTA Team"
Topic.find_or_create_by scope: "Systems Specialist", name: "Aggregate and Analyze Regional Data"
Topic.find_or_create_by scope: "Systems Specialist", name: "Direct TTA to Grantees"
Topic.find_or_create_by scope: "Systems Specialist", name: "Support National Priorities"
Topic.find_or_create_by scope: "Systems Specialist", name: "Other"
