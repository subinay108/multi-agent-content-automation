from services.supabase import insert_workflow_step, update_workflow_status
from utils.logger import log_message
from agents.planner import planner_agent
from agents.content import content_agent
from agents.compliance import compliance_agent
from agents.localization import localization_agent
from agents.strategy import strategy_agent
from agents.publisher import publisher_agent

async def run_pipeline(workflow_id: str, input_data: dict):
    try:
        log_message(workflow_id, "[Pipeline] Starting execution")
        
        # 1. Planner
        log_message(workflow_id, "[Planner] Creating plan...")
        plan = await planner_agent(input_data)
        insert_workflow_step(workflow_id, "planner", str(input_data), plan)
        log_message(workflow_id, "[Planner] Plan created")

        # 2. Content
        log_message(workflow_id, "[Content] Generating draft...")
        draft = await content_agent(plan)
        insert_workflow_step(workflow_id, "content", plan, draft)
        log_message(workflow_id, "[Content] Draft generated")

        # 3. Compliance
        log_message(workflow_id, "[Compliance] Checking compliance...")
        compliance = await compliance_agent(draft)
        insert_workflow_step(workflow_id, "compliance", draft, compliance)
        log_message(workflow_id, "[Compliance] Issues fixed")

        # 4. Localization
        language = input_data.get("language", "English")
        log_message(workflow_id, f"[Localization] Translating to {language}...")
        localized = await localization_agent(compliance, language)
        insert_workflow_step(workflow_id, "localization", compliance, localized)
        log_message(workflow_id, "[Localization] Translation complete")

        # 5. Strategy
        platform = input_data.get("content_type", "General Platform")
        log_message(workflow_id, "[Strategy] Adding strategy...")
        strategy = await strategy_agent(localized, platform)
        insert_workflow_step(workflow_id, "strategy", localized, strategy)
        log_message(workflow_id, "[Strategy] Strategy added")

        # 6. Publisher
        log_message(workflow_id, "[Publisher] Formatting output...")
        final = await publisher_agent(strategy)
        insert_workflow_step(workflow_id, "publisher", strategy, final)
        log_message(workflow_id, "[Publisher] Final formatting complete")

        update_workflow_status(workflow_id, "completed")
        log_message(workflow_id, "[Pipeline] Successfully completed")
        return final
        
    except Exception as e:
        log_message(workflow_id, f"[Error] Pipeline failed: {str(e)}")
        update_workflow_status(workflow_id, "failed")
        raise e
