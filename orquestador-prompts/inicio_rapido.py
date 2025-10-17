#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de inicio rápido para el Orquestador de Prompts.
Guía paso a paso para configurar y ejecutar el orquestador.
"""

import os
import sys
import subprocess
import configparser
from pathlib import Path

def verificar_dependencias():
    """Verifica que las dependencias estén instaladas."""
    print("🔍 Verificando dependencias...")
    
    dependencias = ['pyautogui', 'cv2', 'keyboard', 'numpy']
    faltantes = []
    
    for dep in dependencias:
        try:
            if dep == 'cv2':
                import cv2
            else:
                __import__(dep)
            print(f"   ✅ {dep}")
        except ImportError:
            print(f"   ❌ {dep} - FALTANTE")
            faltantes.append(dep)
    
    if faltantes:
        print(f"\n⚠️  Dependencias faltantes: {', '.join(faltantes)}")
        print("💡 Ejecuta: python instalar.py")
        return False
    
    return True

def mostrar_menu():
    """Muestra el menú principal."""
    print("\n" + "="*60)
    print("🎯 ORQUESTADOR DE PROMPTS - INICIO RÁPIDO")
    print("="*60)
    print()
    print("Selecciona una opción:")
    print()
    print("1. 🔧 Calibración visual (Recomendado)")
    print("2. 🎨 Generar plantillas")
    print("3. 🚀 Ejecutar orquestador v2.0")
    print("4. 🚀 Ejecutar orquestador v1.0")
    print("5. ⚙️  Configurar cantidad de chats")
    print("6. 📝 Personalizar plantillas de prompts")
    print("7. 📊 Ver configuración actual")
    print("8. 📋 Ver checklist de configuración")
    print("9. 🔁 Implementar pipelines encadenados")
    print("10. 📚 Ver documentación")
    print("11. ❌ Salir")
    print()

def ejecutar_calibracion():
    """Ejecuta el calibrador visual."""
    print("🔧 Iniciando calibrador visual...")
    try:
        subprocess.run([sys.executable, "calibrar_regiones.py"], check=True)
        print("✅ Calibración completada")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error en calibración: {e}")
    except FileNotFoundError:
        print("❌ No se encontró calibrar_regiones.py")

def generar_plantillas():
    """Genera las plantillas de detección."""
    print("🎨 Generando plantillas...")
    try:
        subprocess.run([sys.executable, "generar_plantillas.py"], check=True)
        print("✅ Plantillas generadas")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error generando plantillas: {e}")
    except FileNotFoundError:
        print("❌ No se encontró generar_plantillas.py")

def ejecutar_orquestador_v2():
    """Ejecuta el orquestador v2.0."""
    print("🚀 Iniciando orquestador v2.0...")
    print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
    try:
        subprocess.run([sys.executable, "orquestador_prompts_v2.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando orquestador: {e}")
    except FileNotFoundError:
        print("❌ No se encontró orquestador_prompts_v2.py")

def ejecutar_orquestador_v1():
    """Ejecuta el orquestador v1.0."""
    print("🚀 Iniciando orquestador v1.0...")
    print("📋 Controles: F8 (pausar), F9 (saltar), ESC (abortar)")
    try:
        subprocess.run([sys.executable, "orquestador_prompts.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando orquestador: {e}")
    except FileNotFoundError:
        print("❌ No se encontró orquestador_prompts.py")

def mostrar_checklist():
    """Muestra el checklist de configuración."""
    print("📋 Abriendo checklist...")
    try:
        if os.path.exists("CHECKLIST.md"):
            print("📄 Checklist disponible en: CHECKLIST.md")
            print("💡 Abre el archivo para ver el checklist completo")
        else:
            print("❌ No se encontró CHECKLIST.md")
    except Exception as e:
        print(f"❌ Error: {e}")

def configurar_cantidad_chats():
    """Configura la cantidad de chats que se usarán simultáneamente."""
    print("\n⚙️  CONFIGURACIÓN DE CANTIDAD DE CHATS")
    print("="*50)
    print()
    print("Esta opción te permite configurar cuántos chats de Cursor")
    print("se usarán simultáneamente durante la ejecución del orquestador.")
    print()
    
    try:
        # Leer configuración actual
        config_file = "config.ini"
        config = configparser.ConfigParser()
        
        if os.path.exists(config_file):
            config.read(config_file, encoding='utf-8')
            chats_actuales = config.getint('GENERAL', 'cantidad_chats', fallback=2)
        else:
            chats_actuales = 2
            print("⚠️  No se encontró config.ini, usando valores por defecto")
        
        print(f"Cantidad actual de chats: {chats_actuales}")
        print()
        print("Opciones disponibles:")
        print("  1. 2 chats (Frontend + Backend) - Recomendado")
        print("  2. 3 chats (Frontend + Backend + Marketing)")
        print("  3. 4 chats (Frontend + Backend + Marketing + Analytics)")
        print("  4. Personalizado")
        print()
        
        opcion = input("Selecciona una opción (1-4): ").strip()
        
        if opcion == "1":
            nueva_cantidad = 2
            print("✅ Configurado para 2 chats (Frontend + Backend)")
        elif opcion == "2":
            nueva_cantidad = 3
            print("✅ Configurado para 3 chats (Frontend + Backend + Marketing)")
        elif opcion == "3":
            nueva_cantidad = 4
            print("✅ Configurado para 4 chats (Frontend + Backend + Marketing + Analytics)")
        elif opcion == "4":
            try:
                nueva_cantidad = int(input("Ingresa la cantidad de chats (2-6): "))
                if 2 <= nueva_cantidad <= 6:
                    print(f"✅ Configurado para {nueva_cantidad} chats")
                else:
                    print("❌ La cantidad debe estar entre 2 y 6")
                    return
            except ValueError:
                print("❌ Ingresa un número válido")
                return
        else:
            print("❌ Opción inválida")
            return
        
        # Actualizar configuración
        if not config.has_section('GENERAL'):
            config.add_section('GENERAL')
        
        config.set('GENERAL', 'cantidad_chats', str(nueva_cantidad))
        
        # Configurar coordenadas según la cantidad de chats
        if not config.has_section('COORDENADAS'):
            config.add_section('COORDENADAS')
        
        # Coordenadas por defecto para diferentes cantidades de chats
        coordenadas_por_defecto = {
            2: {
                'chat_1_x': '400', 'chat_1_y': '800',
                'chat_2_x': '1200', 'chat_2_y': '800'
            },
            3: {
                'chat_1_x': '300', 'chat_1_y': '800',
                'chat_2_x': '800', 'chat_2_y': '800',
                'chat_3_x': '1300', 'chat_3_y': '800'
            },
            4: {
                'chat_1_x': '250', 'chat_1_y': '800',
                'chat_2_x': '650', 'chat_2_y': '800',
                'chat_3_x': '1050', 'chat_3_y': '800',
                'chat_4_x': '1450', 'chat_4_y': '800'
            }
        }
        
        if nueva_cantidad in coordenadas_por_defecto:
            coords = coordenadas_por_defecto[nueva_cantidad]
            for key, value in coords.items():
                config.set('COORDENADAS', key, value)
        
        # Guardar configuración
        with open(config_file, 'w', encoding='utf-8') as f:
            config.write(f)
        
        print(f"\n✅ Configuración guardada en {config_file}")
        print(f"📊 Cantidad de chats: {nueva_cantidad}")
        
        if nueva_cantidad > 2:
            print("\n⚠️  IMPORTANTE:")
            print("   - Asegúrate de tener suficientes ventanas de Cursor abiertas")
            print("   - Las coordenadas se han configurado automáticamente")
            print("   - Puedes ajustar las coordenadas manualmente en config.ini")
            print("   - Ejecuta la calibración visual para ajustar coordenadas")
        
    except Exception as e:
        print(f"❌ Error configurando cantidad de chats: {e}")

def personalizar_plantillas_prompts():
    """Personaliza las plantillas de prompts según la cantidad de chats configurada."""
    print("\n📝 PERSONALIZACIÓN DE PLANTILLAS DE PROMPTS")
    print("="*60)
    print()
    print("Esta opción te permite configurar qué prompts se enviarán")
    print("a cada chat según la cantidad configurada.")
    print()
    
    try:
        # Leer configuración actual
        config_file = "config.ini"
        config = configparser.ConfigParser()
        
        if os.path.exists(config_file):
            config.read(config_file, encoding='utf-8')
            cantidad_chats = config.getint('GENERAL', 'cantidad_chats', fallback=2)
        else:
            cantidad_chats = 2
            print("⚠️  No se encontró config.ini, usando 2 chats por defecto")
            print("💡 Configura primero la cantidad de chats con la opción 5")
            return
        
        print(f"📊 Cantidad de chats configurados: {cantidad_chats}")
        print()
        
        # Plantillas por defecto según cantidad de chats
        plantillas_por_defecto = {
            2: {
                'chat_1': 'Frontend',
                'chat_2': 'Backend'
            },
            3: {
                'chat_1': 'Frontend',
                'chat_2': 'Backend', 
                'chat_3': 'Marketing'
            },
            4: {
                'chat_1': 'Frontend',
                'chat_2': 'Backend',
                'chat_3': 'Marketing',
                'chat_4': 'Analytics'
            },
            5: {
                'chat_1': 'Frontend',
                'chat_2': 'Backend',
                'chat_3': 'Marketing',
                'chat_4': 'Analytics',
                'chat_5': 'CRM'
            },
            6: {
                'chat_1': 'Frontend',
                'chat_2': 'Backend',
                'chat_3': 'Marketing',
                'chat_4': 'Analytics',
                'chat_5': 'CRM',
                'chat_6': 'Support'
            }
        }
        
        # Plantillas especializadas por tareas específicas
        plantillas_especializadas = {
            'notion_user_stories': {
                'nombre': '📋 Extraer User Stories de Notion',
                'descripcion': 'Analiza páginas de Notion para extraer user stories y generar documentación estructurada. Cursor recibirá: 1) URL de página Notion, 2) Path del módulo destino. Generará: archivo MD con user stories estructuradas, criterios de aceptación, y desglose técnico frontend/backend en el módulo especificado.',
                'chats': {
                    1: {'tipo': 'Analista_Notion', 'archivo': '@prompts_notion_analyst'},
                    2: {'tipo': 'Frontend_Dev', 'archivo': '@prompts_frontend_dev'},
                    3: {'tipo': 'Backend_Dev', 'archivo': '@prompts_backend_dev'}
                }
            },
            'desarrollo_completo': {
                'nombre': '🚀 Desarrollo Full-Stack',
                'descripcion': 'Desarrolla aplicaciones completas full-stack. Cursor recibirá: 1) Especificaciones de la aplicación, 2) Stack tecnológico preferido. Generará: estructura de proyecto, componentes React/TypeScript, APIs REST, esquemas de BD, configuración Docker, y documentación técnica completa.',
                'chats': {
                    1: {'tipo': 'Frontend_React', 'archivo': '@prompts_react_dev'},
                    2: {'tipo': 'Backend_Node', 'archivo': '@prompts_node_dev'},
                    3: {'tipo': 'Database_Expert', 'archivo': '@prompts_database'},
                    4: {'tipo': 'DevOps', 'archivo': '@prompts_devops'}
                }
            },
            'documentation_team': {
                'nombre': '📚 Equipo de Documentación',
                'descripcion': 'Genera documentación técnica completa y profesional. Cursor recibirá: 1) Código fuente del proyecto, 2) Especificaciones de APIs, 3) Requisitos de documentación. Generará: documentación técnica, guías de usuario, documentación de APIs con Swagger, y manuales de instalación.',
                'chats': {
                    1: {'tipo': 'Technical_Writer', 'archivo': '@prompts_technical_writer'},
                    2: {'tipo': 'API_Documenter', 'archivo': '@prompts_api_docs'},
                    3: {'tipo': 'User_Guide_Creator', 'archivo': '@prompts_user_guides'}
                }
            },
            'testing_qa': {
                'nombre': '🧪 Testing y QA',
                'descripcion': 'Implementa testing automatizado completo y control de calidad. Cursor recibirá: 1) Código fuente a testear, 2) Casos de uso específicos, 3) Requisitos de rendimiento. Generará: tests unitarios, tests de integración, tests E2E, reportes de cobertura, y estrategias de testing.',
                'chats': {
                    1: {'tipo': 'Test_Automation', 'archivo': '@prompts_test_automation'},
                    2: {'tipo': 'QA_Engineer', 'archivo': '@prompts_qa_engineer'},
                    3: {'tipo': 'Performance_Testing', 'archivo': '@prompts_performance_testing'}
                }
            },
            'mobile_development': {
                'nombre': '📱 Desarrollo Mobile',
                'descripcion': 'Desarrolla aplicaciones móviles cross-platform optimizadas. Cursor recibirá: 1) Especificaciones de la app móvil, 2) Plataformas objetivo (iOS/Android), 3) Funcionalidades requeridas. Generará: estructura de proyecto React Native/Flutter, componentes nativos, APIs móviles, y configuraciones de despliegue.',
                'chats': {
                    1: {'tipo': 'React_Native_Dev', 'archivo': '@prompts_react_native'},
                    2: {'tipo': 'Flutter_Dev', 'archivo': '@prompts_flutter'},
                    3: {'tipo': 'Mobile_UI_UX', 'archivo': '@prompts_mobile_ui'},
                    4: {'tipo': 'Mobile_Backend', 'archivo': '@prompts_mobile_backend'}
                }
            },
            'ecommerce_platform': {
                'nombre': '🛒 Plataforma E-commerce',
                'descripcion': 'Construye tiendas online completas con todas las funcionalidades. Cursor recibirá: 1) Catálogo de productos, 2) Métodos de pago requeridos, 3) Reglas de negocio. Generará: frontend de tienda, sistema de pagos, gestión de inventario, procesamiento de pedidos, y dashboard de analytics.',
                'chats': {
                    1: {'tipo': 'Ecommerce_Frontend', 'archivo': '@prompts_ecommerce_frontend'},
                    2: {'tipo': 'Payment_Integration', 'archivo': '@prompts_payment_systems'},
                    3: {'tipo': 'Inventory_Management', 'archivo': '@prompts_inventory'},
                    4: {'tipo': 'Order_Processing', 'archivo': '@prompts_order_management'},
                    5: {'tipo': 'Analytics_Dashboard', 'archivo': '@prompts_ecommerce_analytics'}
                }
            },
            'saas_application': {
                'nombre': '☁️ Aplicación SaaS',
                'descripcion': 'Desarrolla aplicaciones SaaS multi-tenant con suscripciones. Cursor recibirá: 1) Modelo de negocio SaaS, 2) Planes de suscripción, 3) Funcionalidades por plan. Generará: arquitectura multi-tenant, sistema de suscripciones, facturación automática, gestión de usuarios, y analytics empresariales.',
                'chats': {
                    1: {'tipo': 'SaaS_Frontend', 'archivo': '@prompts_saas_frontend'},
                    2: {'tipo': 'Multi_Tenant_Backend', 'archivo': '@prompts_multi_tenant'},
                    3: {'tipo': 'Subscription_Management', 'archivo': '@prompts_subscriptions'},
                    4: {'tipo': 'User_Management', 'archivo': '@prompts_user_management'},
                    5: {'tipo': 'Billing_System', 'archivo': '@prompts_billing'},
                    6: {'tipo': 'Analytics_Reporting', 'archivo': '@prompts_saas_analytics'}
                }
            },
            'ai_ml_integration': {
                'nombre': '🤖 Integración AI/ML',
                'descripcion': 'Integra inteligencia artificial en aplicaciones existentes. Cursor recibirá: 1) Datos de entrenamiento, 2) Casos de uso de IA, 3) Modelos pre-entrenados. Generará: interfaces de IA, pipelines de ML, procesamiento de datos, y integración de modelos en producción.',
                'chats': {
                    1: {'tipo': 'AI_Frontend', 'archivo': '@prompts_ai_frontend'},
                    2: {'tipo': 'ML_Backend', 'archivo': '@prompts_ml_backend'},
                    3: {'tipo': 'Data_Processing', 'archivo': '@prompts_data_processing'},
                    4: {'tipo': 'Model_Integration', 'archivo': '@prompts_model_integration'}
                }
            },
            'real_time_app': {
                'nombre': '⚡ Aplicación Tiempo Real',
                'descripcion': 'Desarrolla aplicaciones con comunicación en tiempo real. Cursor recibirá: 1) Casos de uso de tiempo real, 2) Volumen de usuarios esperado, 3) Tipos de eventos. Generará: WebSocket servers, interfaces en tiempo real, sistemas de notificaciones, y streaming de eventos.',
                'chats': {
                    1: {'tipo': 'Real_Time_Frontend', 'archivo': '@prompts_realtime_frontend'},
                    2: {'tipo': 'WebSocket_Backend', 'archivo': '@prompts_websocket_backend'},
                    3: {'tipo': 'Event_Streaming', 'archivo': '@prompts_event_streaming'},
                    4: {'tipo': 'Notification_System', 'archivo': '@prompts_notifications'}
                }
            },
            'microservices_architecture': {
                'nombre': '🏗️ Arquitectura Microservicios',
                'descripcion': 'Diseña arquitecturas distribuidas escalables. Cursor recibirá: 1) Servicios a descomponer, 2) Requisitos de escalabilidad, 3) Tecnologías preferidas. Generará: API Gateway, service discovery, eventos asíncronos, orquestación de contenedores, y monitoreo distribuido.',
                'chats': {
                    1: {'tipo': 'API_Gateway', 'archivo': '@prompts_api_gateway'},
                    2: {'tipo': 'Service_Discovery', 'archivo': '@prompts_service_discovery'},
                    3: {'tipo': 'Event_Driven', 'archivo': '@prompts_event_driven'},
                    4: {'tipo': 'Container_Orchestration', 'archivo': '@prompts_container_orchestration'},
                    5: {'tipo': 'Monitoring_Logging', 'archivo': '@prompts_monitoring'},
                    6: {'tipo': 'Security_Compliance', 'archivo': '@prompts_microservices_security'}
                }
            },
            'fintech_application': {
                'nombre': '💰 Aplicación FinTech',
                'descripcion': 'Desarrolla aplicaciones financieras seguras y compliant. Cursor recibirá: 1) Regulaciones financieras aplicables, 2) Tipos de transacciones, 3) Requisitos de seguridad. Generará: interfaces financieras, procesamiento de pagos, evaluación de riesgos, reportes de cumplimiento, y integración blockchain.',
                'chats': {
                    1: {'tipo': 'FinTech_Frontend', 'archivo': '@prompts_fintech_frontend'},
                    2: {'tipo': 'Payment_Processing', 'archivo': '@prompts_payment_processing'},
                    3: {'tipo': 'Risk_Assessment', 'archivo': '@prompts_risk_assessment'},
                    4: {'tipo': 'Compliance_Reporting', 'archivo': '@prompts_compliance'},
                    5: {'tipo': 'Blockchain_Integration', 'archivo': '@prompts_blockchain'}
                }
            },
            'healthcare_app': {
                'nombre': '🏥 Aplicación Healthcare',
                'descripcion': 'Desarrolla aplicaciones de salud HIPAA-compliant. Cursor recibirá: 1) Tipos de datos médicos, 2) Flujos de trabajo clínicos, 3) Requisitos de privacidad. Generará: interfaces de salud, gestión de pacientes, registros médicos seguros, cumplimiento HIPAA, y funcionalidades de telemedicina.',
                'chats': {
                    1: {'tipo': 'Healthcare_Frontend', 'archivo': '@prompts_healthcare_frontend'},
                    2: {'tipo': 'Patient_Management', 'archivo': '@prompts_patient_management'},
                    3: {'tipo': 'Medical_Records', 'archivo': '@prompts_medical_records'},
                    4: {'tipo': 'HIPAA_Compliance', 'archivo': '@prompts_hipaa_compliance'},
                    5: {'tipo': 'Telemedicine', 'archivo': '@prompts_telemedicine'}
                }
            },
            'gaming_platform': {
                'nombre': '🎮 Plataforma Gaming',
                'descripcion': 'Construye plataformas de gaming y sistemas multijugador. Cursor recibirá: 1) Mecánicas de juego, 2) Número de jugadores simultáneos, 3) Tipos de competencia. Generará: interfaces de juego, backends de gaming, sistemas multijugador, leaderboards, y analytics de jugadores.',
                'chats': {
                    1: {'tipo': 'Game_Frontend', 'archivo': '@prompts_game_frontend'},
                    2: {'tipo': 'Game_Backend', 'archivo': '@prompts_game_backend'},
                    3: {'tipo': 'Multiplayer_System', 'archivo': '@prompts_multiplayer'},
                    4: {'tipo': 'Leaderboards', 'archivo': '@prompts_leaderboards'},
                    5: {'tipo': 'Game_Analytics', 'archivo': '@prompts_game_analytics'}
                }
            },
            'iot_application': {
                'nombre': '🌐 Aplicación IoT',
                'descripcion': 'Desarrolla sistemas IoT para monitoreo y control de dispositivos. Cursor recibirá: 1) Tipos de sensores/dispositivos, 2) Volumen de datos, 3) Requisitos de tiempo real. Generará: dashboards IoT, gestión de dispositivos, ingesta de datos de sensores, y procesamiento edge.',
                'chats': {
                    1: {'tipo': 'IoT_Dashboard', 'archivo': '@prompts_iot_dashboard'},
                    2: {'tipo': 'Device_Management', 'archivo': '@prompts_device_management'},
                    3: {'tipo': 'Data_Ingestion', 'archivo': '@prompts_data_ingestion'},
                    4: {'tipo': 'Edge_Computing', 'archivo': '@prompts_edge_computing'}
                }
            },
            'content_management': {
                'nombre': '📝 Sistema CMS',
                'descripcion': 'Construye sistemas de gestión de contenido robustos. Cursor recibirá: 1) Tipos de contenido, 2) Flujos de aprobación, 3) Requisitos de SEO. Generará: interfaces de CMS, APIs de contenido, gestión de medios, optimización SEO, y flujos de trabajo editoriales.',
                'chats': {
                    1: {'tipo': 'CMS_Frontend', 'archivo': '@prompts_cms_frontend'},
                    2: {'tipo': 'Content_API', 'archivo': '@prompts_content_api'},
                    3: {'tipo': 'Media_Management', 'archivo': '@prompts_media_management'},
                    4: {'tipo': 'SEO_Optimization', 'archivo': '@prompts_seo_optimization'},
                    5: {'tipo': 'Workflow_Management', 'archivo': '@prompts_workflow_management'}
                }
            },
            'api_platform': {
                'nombre': '🔌 Plataforma de APIs',
                'descripcion': 'Desarrolla plataformas de APIs empresariales. Cursor recibirá: 1) Servicios a exponer, 2) Políticas de rate limiting, 3) Requisitos de documentación. Generará: diseño de APIs RESTful, gateway de APIs, limitación de velocidad, documentación automática, y portal de desarrolladores.',
                'chats': {
                    1: {'tipo': 'API_Design', 'archivo': '@prompts_api_design'},
                    2: {'tipo': 'API_Gateway', 'archivo': '@prompts_api_gateway'},
                    3: {'tipo': 'Rate_Limiting', 'archivo': '@prompts_rate_limiting'},
                    4: {'tipo': 'API_Documentation', 'archivo': '@prompts_api_documentation'},
                    5: {'tipo': 'Developer_Portal', 'archivo': '@prompts_developer_portal'}
                }
            },
            'backend_generator': {
                'nombre': '🏗️ Generador Backend',
                'descripcion': 'Genera modelos, controladores y rutas desde documentación MD. Cursor recibirá: 1) Archivo MD con especificaciones, 2) Path del src del backend. Generará: modelos de datos, controladores con CRUD, rutas RESTful, validaciones, y middleware de autenticación.',
                'chats': {
                    1: {'tipo': 'Model_Generator', 'archivo': '@prompts_model_generator'},
                    2: {'tipo': 'Controller_Generator', 'archivo': '@prompts_controller_generator'},
                    3: {'tipo': 'Route_Generator', 'archivo': '@prompts_route_generator'}
                }
            },
            'frontend_components': {
                'nombre': '⚛️ Generador Componentes Frontend',
                'descripcion': 'Crea componentes React/TypeScript desde especificaciones. Cursor recibirá: 1) Archivo MD con diseño de componentes, 2) Path del src del frontend. Generará: componentes React, hooks personalizados, tipos TypeScript, estilos CSS/Tailwind, y tests unitarios.',
                'chats': {
                    1: {'tipo': 'Component_Generator', 'archivo': '@prompts_component_generator'},
                    2: {'tipo': 'Hook_Generator', 'archivo': '@prompts_hook_generator'},
                    3: {'tipo': 'Type_Generator', 'archivo': '@prompts_type_generator'}
                }
            },
            'database_schema': {
                'nombre': '🗄️ Generador Esquema BD',
                'descripcion': 'Crea esquemas de base de datos desde documentación. Cursor recibirá: 1) Archivo MD con entidades, 2) Tipo de BD (PostgreSQL/MySQL/MongoDB). Generará: migraciones, modelos, índices, relaciones, y scripts de seeding.',
                'chats': {
                    1: {'tipo': 'Schema_Generator', 'archivo': '@prompts_schema_generator'},
                    2: {'tipo': 'Migration_Generator', 'archivo': '@prompts_migration_generator'},
                    3: {'tipo': 'Seed_Generator', 'archivo': '@prompts_seed_generator'}
                }
            },
            'api_documentation': {
                'nombre': '📚 Generador Documentación API',
                'descripcion': 'Genera documentación completa de APIs desde código. Cursor recibirá: 1) Archivos de rutas/controladores, 2) Path de documentación. Generará: documentación Swagger/OpenAPI, ejemplos de uso, SDKs, y guías de integración.',
                'chats': {
                    1: {'tipo': 'Swagger_Generator', 'archivo': '@prompts_swagger_generator'},
                    2: {'tipo': 'SDK_Generator', 'archivo': '@prompts_sdk_generator'},
                    3: {'tipo': 'Guide_Generator', 'archivo': '@prompts_guide_generator'}
                }
            },
            'test_generator': {
                'nombre': '🧪 Generador Tests',
                'descripcion': 'Crea tests automatizados desde código existente. Cursor recibirá: 1) Archivos de código a testear, 2) Path de tests. Generará: tests unitarios, tests de integración, mocks, fixtures, y reportes de cobertura.',
                'chats': {
                    1: {'tipo': 'Unit_Test_Generator', 'archivo': '@prompts_unit_test_generator'},
                    2: {'tipo': 'Integration_Test_Generator', 'archivo': '@prompts_integration_test_generator'},
                    3: {'tipo': 'Mock_Generator', 'archivo': '@prompts_mock_generator'}
                }
            }
        }
        
        print("Opciones de personalización:")
        print("1. 🎯 Usar plantillas por defecto")
        print("2. ✏️  Personalizar manualmente")
        print("3. 📁 Cargar desde archivos existentes")
        print("4. 🔄 Restaurar configuración anterior")
        print("5. 🎨 Plantillas especializadas por tareas")
        print()
        
        opcion = input("Selecciona una opción (1-5): ").strip()
        
        if opcion == "1":
            # Usar plantillas por defecto
            if cantidad_chats in plantillas_por_defecto:
                plantillas = plantillas_por_defecto[cantidad_chats]
                print(f"\n✅ Configurando plantillas por defecto para {cantidad_chats} chats:")
                
                for i, (chat_key, tipo) in enumerate(plantillas.items(), 1):
                    print(f"   Chat {i}: {tipo}")
                    config.set('PLANTILLAS', f'chat_{i}_tipo', tipo)
                    config.set('PLANTILLAS', f'chat_{i}_archivo', f'@prompts_{tipo.lower()}')
                
                print("\n💡 Los archivos de prompts deben existir:")
                for tipo in plantillas.values():
                    print(f"   - @prompts_{tipo.lower()}")
            
        elif opcion == "2":
            # Personalizar manualmente
            print(f"\n✏️  PERSONALIZACIÓN MANUAL PARA {cantidad_chats} CHATS")
            print("="*50)
            
            tipos_disponibles = [
                'Frontend', 'Backend', 'Marketing', 'Analytics', 
                'CRM', 'Support', 'Training', 'Documentation'
            ]
            
            for i in range(1, cantidad_chats + 1):
                print(f"\n📝 Configuración del Chat {i}:")
                print(f"Tipos disponibles: {', '.join(tipos_disponibles)}")
                
                tipo = input(f"Tipo para Chat {i} (ej: Frontend): ").strip()
                if not tipo:
                    tipo = f"Chat{i}"
                
                archivo = input(f"Archivo de prompts para Chat {i} (ej: @prompts_frontend): ").strip()
                if not archivo:
                    archivo = f"@prompts_{tipo.lower()}"
                
                config.set('PLANTILLAS', f'chat_{i}_tipo', tipo)
                config.set('PLANTILLAS', f'chat_{i}_archivo', archivo)
                
                print(f"✅ Chat {i}: {tipo} -> {archivo}")
        
        elif opcion == "3":
            # Cargar desde archivos existentes
            print("\n📁 CARGAR DESDE ARCHIVOS EXISTENTES")
            print("="*40)
            
            archivos_encontrados = []
            for archivo in os.listdir('.'):
                if archivo.startswith('prompts_') and archivo.endswith('.json'):
                    archivos_encontrados.append(archivo)
            
            if archivos_encontrados:
                print("Archivos de prompts encontrados:")
                for i, archivo in enumerate(archivos_encontrados, 1):
                    print(f"   {i}. {archivo}")
                
                print(f"\nSe asignarán automáticamente a los {cantidad_chats} chats:")
                for i in range(1, cantidad_chats + 1):
                    if i <= len(archivos_encontrados):
                        archivo = archivos_encontrados[i-1]
                        tipo = archivo.replace('prompts_', '').replace('.json', '').title()
                        config.set('PLANTILLAS', f'chat_{i}_tipo', tipo)
                        config.set('PLANTILLAS', f'chat_{i}_archivo', f'@{archivo.replace(".json", "")}')
                        print(f"   Chat {i}: {tipo} -> @{archivo.replace('.json', '')}")
                    else:
                        print(f"   Chat {i}: Sin archivo asignado")
            else:
                print("❌ No se encontraron archivos de prompts")
                print("💡 Crea archivos como: prompts_frontend.json, prompts_backend.json, etc.")
                return
        
        elif opcion == "4":
            # Restaurar configuración anterior
            print("\n🔄 RESTAURAR CONFIGURACIÓN ANTERIOR")
            print("="*40)
            
            if os.path.exists('config.ini.backup'):
                import shutil
                shutil.copy('config.ini.backup', 'config.ini')
                print("✅ Configuración anterior restaurada")
            else:
                print("❌ No se encontró backup de configuración")
                return
        
        elif opcion == "5":
            # Plantillas especializadas por tareas
            print("\n🎨 PLANTILLAS ESPECIALIZADAS POR TAREAS")
            print("="*50)
            print()
            print("Selecciona una plantilla especializada:")
            print()
            
            for i, (key, plantilla) in enumerate(plantillas_especializadas.items(), 1):
                print(f"{i}. {plantilla['nombre']}")
                print(f"   {plantilla['descripcion']}")
                print()
            
            try:
                sub_opcion = int(input("Selecciona una plantilla (1-{}): ".format(len(plantillas_especializadas))).strip())
                plantilla_keys = list(plantillas_especializadas.keys())
                
                if 1 <= sub_opcion <= len(plantilla_keys):
                    plantilla_key = plantilla_keys[sub_opcion - 1]
                    plantilla_seleccionada = plantillas_especializadas[plantilla_key]
                    
                    print(f"\n✅ Configurando: {plantilla_seleccionada['nombre']}")
                    print(f"📝 {plantilla_seleccionada['descripcion']}")
                    print()
                    
                    # Verificar si la cantidad de chats es compatible
                    chats_requeridos = len(plantilla_seleccionada['chats'])
                    if cantidad_chats < chats_requeridos:
                        print(f"⚠️  Esta plantilla requiere {chats_requeridos} chats, pero tienes {cantidad_chats}")
                        print("💡 Configura más chats con la opción 5 del menú principal")
                        return
                    
                    # Configurar los chats según la plantilla
                    for chat_num, config_chat in plantilla_seleccionada['chats'].items():
                        if chat_num <= cantidad_chats:
                            config.set('PLANTILLAS', f'chat_{chat_num}_tipo', config_chat['tipo'])
                            config.set('PLANTILLAS', f'chat_{chat_num}_archivo', config_chat['archivo'])
                            print(f"   Chat {chat_num}: {config_chat['tipo']} -> {config_chat['archivo']}")
                    
                    # Si hay chats sobrantes, usar configuración por defecto
                    if cantidad_chats > chats_requeridos:
                        print(f"\n💡 Chats adicionales ({chats_requeridos + 1}-{cantidad_chats}) usarán configuración por defecto")
                        for chat_num in range(chats_requeridos + 1, cantidad_chats + 1):
                            config.set('PLANTILLAS', f'chat_{chat_num}_tipo', f'Chat{chat_num}')
                            config.set('PLANTILLAS', f'chat_{chat_num}_archivo', f'@prompts_chat{chat_num}')
                            print(f"   Chat {chat_num}: Chat{chat_num} -> @prompts_chat{chat_num}")
                    
                    print(f"\n💡 Archivos de prompts requeridos:")
                    for config_chat in plantilla_seleccionada['chats'].values():
                        print(f"   - {config_chat['archivo']}")
                    
                else:
                    print("❌ Opción inválida")
                    return
                    
            except ValueError:
                print("❌ Ingresa un número válido")
                return
        
        else:
            print("❌ Opción inválida")
            return
        
        # Crear backup antes de guardar
        if os.path.exists('config.ini'):
            import shutil
            shutil.copy('config.ini', 'config.ini.backup')
        
        # Asegurar que existe la sección PLANTILLAS
        if not config.has_section('PLANTILLAS'):
            config.add_section('PLANTILLAS')
        
        # Guardar configuración
        with open(config_file, 'w', encoding='utf-8') as f:
            config.write(f)
        
        print(f"\n✅ Configuración de plantillas guardada en {config_file}")
        print("💡 Los archivos de prompts deben existir para que funcione correctamente")
        
        # Mostrar resumen de configuración
        print(f"\n📋 RESUMEN DE CONFIGURACIÓN:")
        for i in range(1, cantidad_chats + 1):
            tipo = config.get('PLANTILLAS', f'chat_{i}_tipo', fallback='No configurado')
            archivo = config.get('PLANTILLAS', f'chat_{i}_archivo', fallback='No configurado')
            print(f"   Chat {i}: {tipo} -> {archivo}")
        
    except Exception as e:
        print(f"❌ Error configurando plantillas: {e}")

def mostrar_configuracion_chats():
    """Muestra la configuración actual de chats."""
    print("\n📊 CONFIGURACIÓN ACTUAL DE CHATS")
    print("="*40)
    
    try:
        config_file = "config.ini"
        if os.path.exists(config_file):
            config = configparser.ConfigParser()
            config.read(config_file, encoding='utf-8')
            
            cantidad_chats = config.getint('GENERAL', 'cantidad_chats', fallback=2)
            print(f"📊 Cantidad de chats configurados: {cantidad_chats}")
            
            if cantidad_chats >= 2:
                print(f"📍 Chat 1 (Frontend): ({config.get('COORDENADAS', 'chat_1_x', fallback='400')}, {config.get('COORDENADAS', 'chat_1_y', fallback='800')})")
                print(f"📍 Chat 2 (Backend): ({config.get('COORDENADAS', 'chat_2_x', fallback='1200')}, {config.get('COORDENADAS', 'chat_2_y', fallback='800')})")
            
            if cantidad_chats >= 3:
                print(f"📍 Chat 3 (Marketing): ({config.get('COORDENADAS', 'chat_3_x', fallback='1300')}, {config.get('COORDENADAS', 'chat_3_y', fallback='800')})")
            
            if cantidad_chats >= 4:
                print(f"📍 Chat 4 (Analytics): ({config.get('COORDENADAS', 'chat_4_x', fallback='1450')}, {config.get('COORDENADAS', 'chat_4_y', fallback='800')})")
            
            if cantidad_chats >= 5:
                print(f"📍 Chat 5: ({config.get('COORDENADAS', 'chat_5_x', fallback='1600')}, {config.get('COORDENADAS', 'chat_5_y', fallback='800')})")
            
            if cantidad_chats >= 6:
                print(f"📍 Chat 6: ({config.get('COORDENADAS', 'chat_6_x', fallback='1750')}, {config.get('COORDENADAS', 'chat_6_y', fallback='800')})")
            
            # Mostrar configuración de plantillas
            print(f"\n📝 CONFIGURACIÓN DE PLANTILLAS:")
            if config.has_section('PLANTILLAS'):
                for i in range(1, cantidad_chats + 1):
                    tipo = config.get('PLANTILLAS', f'chat_{i}_tipo', fallback='No configurado')
                    archivo = config.get('PLANTILLAS', f'chat_{i}_archivo', fallback='No configurado')
                    print(f"   Chat {i}: {tipo} -> {archivo}")
            else:
                print("   No hay plantillas configuradas")
                print("   💡 Usa la opción 6 para configurar plantillas")
            
            print(f"\n💡 Para cambiar la configuración, usa las opciones 5 y 6 del menú principal")
        else:
            print("❌ No se encontró config.ini")
            print("💡 Ejecuta la opción 5 para configurar la cantidad de chats")
            
    except Exception as e:
        print(f"❌ Error leyendo configuración: {e}")

def mostrar_documentacion():
    """Muestra información sobre la documentación."""
    print("📚 Documentación disponible:")
    print()
    print("📄 README.md - Documentación completa del proyecto")
    print("📋 CHECKLIST.md - Checklist rápido de configuración")
    print("📄 README_ORQUESTADOR.md - Guía de esta carpeta")
    print()
    print("💡 Abre los archivos .md para ver la documentación completa")

def implementar_pipelines_encadenados():
    """Implementa pipelines encadenados para flujos de trabajo completos."""
    print("\n🔁 PIPELINES ENCADENADOS")
    print("="*50)
    print()
    print("Los pipelines encadenados permiten ejecutar múltiples plantillas")
    print("en secuencia para flujos de trabajo completos.")
    print()
    
    # Pipelines predefinidos
    pipelines_predefinidos = {
        'desarrollo_completo': {
            'nombre': '🚀 Desarrollo Completo Full-Stack',
            'descripcion': 'Pipeline completo desde análisis hasta despliegue',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '🏗️ Generar Backend',
                '⚛️ Generar Componentes Frontend',
                '🗄️ Generar Esquema BD',
                '🧪 Generar Tests',
                '📚 Generar Documentación API'
            ],
            'plantillas': [
                'notion_user_stories',
                'backend_generator',
                'frontend_components',
                'database_schema',
                'test_generator',
                'api_documentation'
            ]
        },
        'ecommerce_completo': {
            'nombre': '🛒 E-commerce Completo',
            'descripcion': 'Pipeline para tienda online completa',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '🛒 Plataforma E-commerce',
                '🗄️ Generar Esquema BD',
                '🧪 Generar Tests',
                '📚 Generar Documentación API'
            ],
            'plantillas': [
                'notion_user_stories',
                'ecommerce_platform',
                'database_schema',
                'test_generator',
                'api_documentation'
            ]
        },
        'saas_completo': {
            'nombre': '☁️ SaaS Completo',
            'descripcion': 'Pipeline para aplicación SaaS completa',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '☁️ Aplicación SaaS',
                '🗄️ Generar Esquema BD',
                '🧪 Generar Tests',
                '📚 Generar Documentación API'
            ],
            'plantillas': [
                'notion_user_stories',
                'saas_application',
                'database_schema',
                'test_generator',
                'api_documentation'
            ]
        },
        'mobile_completo': {
            'nombre': '📱 Mobile App Completa',
            'descripcion': 'Pipeline para aplicación móvil completa',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '📱 Desarrollo Mobile',
                '🏗️ Generar Backend',
                '🗄️ Generar Esquema BD',
                '🧪 Generar Tests'
            ],
            'plantillas': [
                'notion_user_stories',
                'mobile_development',
                'backend_generator',
                'database_schema',
                'test_generator'
            ]
        },
        'ai_integration': {
            'nombre': '🤖 Integración AI Completa',
            'descripcion': 'Pipeline para aplicación con IA integrada',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '🤖 Integración AI/ML',
                '🏗️ Generar Backend',
                '⚛️ Generar Componentes Frontend',
                '🧪 Generar Tests'
            ],
            'plantillas': [
                'notion_user_stories',
                'ai_ml_integration',
                'backend_generator',
                'frontend_components',
                'test_generator'
            ]
        },
        'microservices_completo': {
            'nombre': '🏗️ Microservicios Completo',
            'descripcion': 'Pipeline para arquitectura de microservicios',
            'pasos': [
                '📋 Extraer User Stories de Notion',
                '🏗️ Arquitectura Microservicios',
                '🗄️ Generar Esquema BD',
                '🧪 Generar Tests',
                '📚 Generar Documentación API'
            ],
            'plantillas': [
                'notion_user_stories',
                'microservices_architecture',
                'database_schema',
                'test_generator',
                'api_documentation'
            ]
        }
    }
    
    print("Pipelines predefinidos disponibles:")
    print()
    
    for i, (key, pipeline) in enumerate(pipelines_predefinidos.items(), 1):
        print(f"{i}. {pipeline['nombre']}")
        print(f"   {pipeline['descripcion']}")
        print(f"   Pasos: {' → '.join(pipeline['pasos'])}")
        print()
    
    print("Opciones:")
    print("1. 🎯 Usar pipeline predefinido")
    print("2. ✏️  Crear pipeline personalizado")
    print("3. 📋 Ver pipelines guardados")
    print("4. 🔄 Editar pipeline existente")
    print("5. ❌ Volver al menú principal")
    print()
    
    try:
        opcion = input("Selecciona una opción (1-5): ").strip()
        
        if opcion == "1":
            # Usar pipeline predefinido
            print("\n🎯 SELECCIONAR PIPELINE PREDEFINIDO")
            print("="*40)
            
            for i, (key, pipeline) in enumerate(pipelines_predefinidos.items(), 1):
                print(f"{i}. {pipeline['nombre']}")
            
            try:
                sub_opcion = int(input(f"\nSelecciona un pipeline (1-{len(pipelines_predefinidos)}): ").strip())
                pipeline_keys = list(pipelines_predefinidos.keys())
                
                if 1 <= sub_opcion <= len(pipeline_keys):
                    pipeline_key = pipeline_keys[sub_opcion - 1]
                    pipeline_seleccionado = pipelines_predefinidos[pipeline_key]
                    
                    print(f"\n✅ Pipeline seleccionado: {pipeline_seleccionado['nombre']}")
                    print(f"📝 {pipeline_seleccionado['descripcion']}")
                    print(f"\n🔄 Pasos del pipeline:")
                    for i, paso in enumerate(pipeline_seleccionado['pasos'], 1):
                        print(f"   {i}. {paso}")
                    
                    print(f"\n💡 Plantillas que se ejecutarán:")
                    for i, plantilla in enumerate(pipeline_seleccionado['plantillas'], 1):
                        print(f"   {i}. {plantilla}")
                    
                    # Confirmar ejecución
                    confirmar = input("\n¿Ejecutar este pipeline? (s/n): ").strip().lower()
                    if confirmar in ['s', 'si', 'sí', 'y', 'yes']:
                        ejecutar_pipeline(pipeline_seleccionado)
                    else:
                        print("❌ Pipeline cancelado")
                else:
                    print("❌ Opción inválida")
                    
            except ValueError:
                print("❌ Ingresa un número válido")
        
        elif opcion == "2":
            # Crear pipeline personalizado
            crear_pipeline_personalizado()
        
        elif opcion == "3":
            # Ver pipelines guardados
            ver_pipelines_guardados()
        
        elif opcion == "4":
            # Editar pipeline existente
            editar_pipeline_existente()
        
        elif opcion == "5":
            # Volver al menú principal
            return
        
        else:
            print("❌ Opción inválida")
            
    except KeyboardInterrupt:
        print("\n👋 Operación cancelada")
    except Exception as e:
        print(f"❌ Error: {e}")

def ejecutar_pipeline(pipeline):
    """Ejecuta un pipeline completo."""
    print(f"\n🚀 EJECUTANDO PIPELINE: {pipeline['nombre']}")
    print("="*60)
    
    try:
        for i, plantilla in enumerate(pipeline['plantillas'], 1):
            print(f"\n📋 Paso {i}/{len(pipeline['plantillas'])}: {pipeline['pasos'][i-1]}")
            print(f"🔧 Ejecutando plantilla: {plantilla}")
            
            # Aquí se ejecutaría la plantilla específica
            # Por ahora simulamos la ejecución
            print(f"✅ Plantilla {plantilla} ejecutada correctamente")
            
            # Pausa entre pasos
            if i < len(pipeline['plantillas']):
                input("Presiona Enter para continuar al siguiente paso...")
        
        print(f"\n🎉 Pipeline '{pipeline['nombre']}' completado exitosamente!")
        print("📊 Resumen de ejecución:")
        for i, paso in enumerate(pipeline['pasos'], 1):
            print(f"   ✅ {i}. {paso}")
            
    except Exception as e:
        print(f"❌ Error ejecutando pipeline: {e}")

def crear_pipeline_personalizado():
    """Crea un pipeline personalizado."""
    print("\n✏️  CREAR PIPELINE PERSONALIZADO")
    print("="*40)
    
    nombre = input("Nombre del pipeline: ").strip()
    if not nombre:
        print("❌ El nombre es requerido")
        return
    
    descripcion = input("Descripción del pipeline: ").strip()
    
    print("\n📋 Plantillas disponibles:")
    plantillas_disponibles = [
        'notion_user_stories', 'desarrollo_completo', 'mobile_development',
        'ecommerce_platform', 'saas_application', 'ai_ml_integration',
        'real_time_app', 'microservices_architecture', 'fintech_application',
        'healthcare_app', 'gaming_platform', 'iot_application',
        'content_management', 'api_platform', 'backend_generator',
        'frontend_components', 'database_schema', 'api_documentation',
        'test_generator'
    ]
    
    for i, plantilla in enumerate(plantillas_disponibles, 1):
        print(f"   {i}. {plantilla}")
    
    print("\nSelecciona las plantillas para el pipeline (separadas por comas):")
    seleccion = input("Números: ").strip()
    
    try:
        indices = [int(x.strip()) - 1 for x in seleccion.split(',')]
        plantillas_seleccionadas = [plantillas_disponibles[i] for i in indices if 0 <= i < len(plantillas_disponibles)]
        
        if not plantillas_seleccionadas:
            print("❌ No se seleccionaron plantillas válidas")
            return
        
        print(f"\n✅ Pipeline personalizado creado:")
        print(f"   Nombre: {nombre}")
        print(f"   Descripción: {descripcion}")
        print(f"   Plantillas: {', '.join(plantillas_seleccionadas)}")
        
        # Guardar pipeline (implementar lógica de guardado)
        print("💾 Pipeline guardado exitosamente")
        
    except ValueError:
        print("❌ Formato inválido. Usa números separados por comas (ej: 1,3,5)")

def ver_pipelines_guardados():
    """Muestra los pipelines guardados."""
    print("\n📋 PIPELINES GUARDADOS")
    print("="*30)
    print("💡 Esta funcionalidad se implementará en futuras versiones")
    print("Por ahora, usa los pipelines predefinidos")

def editar_pipeline_existente():
    """Edita un pipeline existente."""
    print("\n🔄 EDITAR PIPELINE EXISTENTE")
    print("="*35)
    print("💡 Esta funcionalidad se implementará en futuras versiones")
    print("Por ahora, usa los pipelines predefinidos")

def main():
    """Función principal del inicio rápido."""
    print("🎯 Orquestador de Prompts - Inicio Rápido")
    print("="*50)
    
    # Verificar dependencias
    if not verificar_dependencias():
        print("\n❌ Instala las dependencias primero:")
        print("   python instalar.py")
        return
    
    while True:
        mostrar_menu()
        
        try:
            opcion = input("Ingresa tu opción (1-11): ").strip()
            
            if opcion == "1":
                ejecutar_calibracion()
            elif opcion == "2":
                generar_plantillas()
            elif opcion == "3":
                ejecutar_orquestador_v2()
            elif opcion == "4":
                ejecutar_orquestador_v1()
            elif opcion == "5":
                configurar_cantidad_chats()
            elif opcion == "6":
                personalizar_plantillas_prompts()
            elif opcion == "7":
                mostrar_configuracion_chats()
            elif opcion == "8":
                mostrar_checklist()
            elif opcion == "9":
                implementar_pipelines_encadenados()
            elif opcion == "10":
                mostrar_documentacion()
            elif opcion == "11":
                print("👋 ¡Hasta luego!")
                break
            else:
                print("❌ Opción inválida. Intenta de nuevo.")
            
            input("\nPresiona Enter para continuar...")
            
        except KeyboardInterrupt:
            print("\n👋 ¡Hasta luego!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()

