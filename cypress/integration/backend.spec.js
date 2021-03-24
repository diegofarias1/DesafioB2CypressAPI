///<reference types="Cypress"/>

//Import de Page

describe('Testes MantisBugTracker', () => {
    afterEach(() => {
        cy.deleteProject()
    })
    beforeEach(() => {
        cy.createProject()
    })
    before(() => {
        cy.deleteProject()
    })

        describe('Projetos', () => {

            it('Criar Project com campos obrigatorios', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.clickBttAddProject()
                managmentProjectPage.assertCreatedSucess()
            })
            it('Criar Projeto com Visibilidade Private', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.selectStateProjectPrivate()

                //Validacao (Assert)
                managmentProjectPage.assertStateProject()
                managmentProjectPage.clickBttAddProject()
                //Validacao (Assert)
                managmentProjectPage.assertCreatedSucess()
            })
            //const projetos = require('../../fixtures/projects.json')
            const projetos = ['ProjectX', 'ProjectY', 'ProjectZ']

            projetos.forEach(projeto => {
                it(`CriarProjeo - DataDriven ${projeto}`, function () {

                    managmentProjectPage.clickConfigBtt()
                    managmentProjectPage.clickManageProject()
                    managmentProjectPage.clickCreateNewProject()
                    managmentProjectPage.sendVarTextNameProject(projeto)
                    managmentProjectPage.clickBttAddProject()

                    //Validacao (Assert)
                    managmentProjectPage.assertCreatedSucess()
                })

            })
            describe('DataDriven', function () {
                before(() => {
                    cy.fixture('projects.json').as('ttdata')

                })

                it('Data Driven arquivo JSON LOOPING', function () {
                    this.ttdata['Array Projetos'].forEach(ttObject => {

                        //Outra forma de fazer DDT
                        //const ArrayProjetos = this.ttdata
                        //cy.get(ArrayProjetos['Array Projetos']).each((ttObject) => {
                        //this.ttdata['Array Projetos'].forEach(ttObject => {


                        managmentProjectPage.clickConfigBtt()
                        managmentProjectPage.clickManageProject()
                        managmentProjectPage.clickCreateNewProject()
                        managmentProjectPage.sendVarTextNameProject(ttObject.projeto)
                        managmentProjectPage.clickBttAddProject()
                        managmentProjectPage.assertCreatedSucess()



                    })
                })

            })


            it('Validar campo Obrigatorio Nome do Projeto', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.alertNameProject()
            })
            it('Criar Projeto com Select Manage DSN', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.selectListStatusProjectDesenvolvimento()
                managmentProjectPage.clickBttAddProject()
                managmentProjectPage.assertCreatedSucess()
            })
            it('Criar Projeto com Select Manage Estavel', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.selectListStatusProjectEstavel()
                managmentProjectPage.clickBttAddProject()
                managmentProjectPage.assertCreatedSucess()
            })
            it('Criar Projeto com Select Manage Obsoleto', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.selectListStatusProjectObsoleto()
                managmentProjectPage.clickBttAddProject()
                managmentProjectPage.assertCreatedSucess()
            })
            it('Criar Projeto com Select Manage Release ', () => {
                managmentProjectPage.clickConfigBtt()
                managmentProjectPage.clickManageProject()
                managmentProjectPage.clickCreateNewProject()
                managmentProjectPage.sendtextNameProject()
                managmentProjectPage.selectListStatusProjectRelease()
                managmentProjectPage.clickBttAddProject()
                managmentProjectPage.assertCreatedSucess()
            })

        })
        describe('Marker', () => {
            it('Criar Marcador com campos obrigatorios', () => {

                managmentMarkerPage.clickConfigBtt()
                managmentMarkerPage.clickMarkersBtt()
                managmentMarkerPage.sendMarkerName()
                managmentMarkerPage.clickCreateMarkerbtt()
                managmentMarkerPage.verifyCreated()
                managmentMarkerPage.clickAcessMarker()
                managmentMarkerPage.clickDeleteMarkerbtt()
                managmentMarkerPage.assertConfirmDeleteMarker()
                managmentMarkerPage.clickConfirmDeletemarkerbtt()

            })
            it('Criar Marcador com todos os campos', () => {
                managmentMarkerPage.clickConfigBtt()
                managmentMarkerPage.clickMarkersBtt()
                managmentMarkerPage.sendMarkerName()
                managmentMarkerPage.sendMarkerDescription()
                managmentMarkerPage.clickCreateMarkerbtt()
                managmentMarkerPage.verifyCreated()
                managmentMarkerPage.clickAcessMarker()
                managmentMarkerPage.clickDeleteMarkerbtt()
                managmentMarkerPage.assertConfirmDeleteMarker()
                managmentMarkerPage.clickConfirmDeletemarkerbtt()
            })
            it('Atualizar Marcador', () => {

                managmentMarkerPage.clickConfigBtt()
                managmentMarkerPage.clickMarkersBtt()
                managmentMarkerPage.sendMarkerName()
                managmentMarkerPage.sendMarkerDescription()
                managmentMarkerPage.clickCreateMarkerbtt()
                managmentMarkerPage.clickAcessMarker()
                managmentMarkerPage.clickUpdateMarkerbtt()
                managmentMarkerPage.sendnewValueNameMarker()
                managmentMarkerPage.clickAfterUpdateMarker()
                managmentMarkerPage.assertConfirmUpdatedSucess()
                managmentMarkerPage.clickDeleteMarkerbtt()
                managmentMarkerPage.assertConfirmDeleteMarker()
                managmentMarkerPage.clickConfirmDeletemarkerbtt()


            })
            it('Verificar Obrigatoriedade do campo Nome', () => {
                managmentMarkerPage.clickConfigBtt()
                managmentMarkerPage.clickMarkersBtt()
                ManagmentMarkerPage.alertNameMarker()
            })
        })
        describe('Perfil', () => {
            it('Cadastrar Perfil Campos Obrigatorios', () => {
                managmentPerfilPage.clickConfigBtt()
                managmentPerfilPage.clickGerenciaPerfil()
                managmentPerfilPage.sendTextPlataforma()
                managmentPerfilPage.sendTextOS()
                managmentPerfilPage.sendTextVersionOS()
                managmentPerfilPage.clickBttSavePerfil()
            })
            it('Validar Obrigatoriedade do Campo Plataforma', () => {
                managmentPerfilPage.clickConfigBtt()
                managmentPerfilPage.clickGerenciaPerfil()
                managmentPerfilPage.sendTextOS()
                managmentPerfilPage.sendTextVersionOS()
                managmentPerfilPage.alertFildPlataforma()

            })
            it('Validar Obrigatoriedade do Campo Campo SO', () => {
                managmentPerfilPage.clickConfigBtt()
                managmentPerfilPage.clickGerenciaPerfil()
                managmentPerfilPage.sendTextPlataforma()
                managmentPerfilPage.sendTextVersionOS()
                managmentPerfilPage.alertFildOS()
            })
            it('Validar Obrigatoriedade do Campo VersaoSO', () => {
                managmentPerfilPage.clickConfigBtt()
                managmentPerfilPage.clickGerenciaPerfil()
                managmentPerfilPage.sendTextPlataforma()
                managmentPerfilPage.sendTextOS()
                managmentPerfilPage.alertFilVersionOS()

            })

        })
    })

    describe('Tasks', () => {

        it('Create tasks only required fields', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()
        })

        it('Adicionando sistema operacional nas tarfas', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()
            taskPage.confirmTaskCreate()
            taskPage.viewtaskcreated()
            taskPage.clickEditTask()
            taskPage.insertOsTask()
            taskPage.clickUpdateTask()

            //Validacao (Assert)
            taskPage.checkOperationalSystemTask()

        })
        it('Criando Tarefa Com Anexo', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.uploadFile()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()
            taskPage.confirmNameAnexo()

        })

        it.skip('Criando Tarefa com Anexo maior que o permitido', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()

            const stub = cy.stub()
            cy.on('window:alert', stub)

            cy.get('.dropzone').attachFile('fullsize.jpg', { subjectType: 'drag-n-drop' })
                //.wait(30000)
                .then(() => {
                    expect(stub.getCall(0)).to.be.calledWith('Os seguintes arquivos:\n"fullsize.jpg" (10.97 MiB)\n\nexcedem o tamanho máximo de arquivo permitido (2.00 MiB)')

                })
        })
        it('Duplicando Tarefa', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()
            taskPage.confirmTaskCreate()
            taskPage.viewtaskcreated()
            taskPage.clickEditTask()
            taskPage.clickUpdateTaskinsert()
            taskPage.clickbuttonCloneTask()

            // Validacao(Assert)
            taskPage.assertRelatorionTask()
            taskPage.clickSaveNewTask()
            taskPage.confirmTaskCreate()

        })
        it('Validando obrigatoriedade do campo Resumo ', () => {
            taskPage.clickNewtask()
            taskPage.alertResumeTask()
        })
        it('Validando obrigatoriedade do campo Descrição ', () => {
            taskPage.clickNewtask()
            taskPage.alertResumeTask()
        })
        it('Validando obrigatoriedade do campo Categoria ', () => {
            taskPage.clickNewtask()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()
            taskPage.alertCreateTask()
        })
        it('Informar Usuario invalido na terefa', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()
            taskPage.viewtaskcreated()
            taskPage.clickNumberTaskCreated()
            taskPage.sendUsernameFalseTask()
            taskPage.clickBttAddUserFalse()
            taskPage.assertAlertUserinTask()

        })
        it('View Resume Tasks', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.clickTaskResume()
            taskPage.assertResumeTask()


        })
        describe('Category', () => {


            it('Create Task Category Backend', () => {
                taskPage.clickNewtask()
                taskPage.selectCategoryBackEnd()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.clickSaveNewTask()

                //Validacao (Assert)
                taskPage.confirmTaskCreate()
                taskPage.navigate_home()
            })
            it('Create Task Category Design', () => {
                taskPage.clickNewtask()
                taskPage.selectCategoryDesign()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.clickSaveNewTask()

                //Validacao (Assert)
                taskPage.confirmTaskCreate()
                taskPage.navigate_home()
            })
            it('Create Task Category Frontend', () => {
                taskPage.clickNewtask()
                taskPage.selectCategoryFrontEnd()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.clickSaveNewTask()

                //Validacao (Assert)
                taskPage.confirmTaskCreate()
                taskPage.navigate_home()
            })
            it('Create Task Category Test', () => {
                taskPage.clickNewtask()
                taskPage.selectCategoryTest()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.clickSaveNewTask()

                //Validacao (Assert)
                taskPage.confirmTaskCreate()
                taskPage.navigate_home()
            })
        })
        it('Select Profile Create Task', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectProfile()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()

        })
        it('Criando Tarefa preenchendo Perfil ( Plataforma )', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.insertPlataformTask()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa preenchendo Perfil ( OS )', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.insertOsTask()
            taskPage.clickSaveNewTask()

            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa preenchendo Perfil ( VERSAO OS )', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.insertVersionOStask()

            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        describe('Frequencia', () => {

            it('Criando Tarefa com frequencia "SEMPRE', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencySempre()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()

            })
            it('Criando Tarefa com frequencia "AS VEZES', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencyAsvezes()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()

            })
            it('Criando Tarefa com frequencia "Aleatorio', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencyAleatorio()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()

            })
            it('Criando Tarefa com frequencia "Nao Se Atentou', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencyNaoSeAtentou()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()

            })
            it('Criando Tarefa com frequencia "Incapaz de Produzir', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencyIncapaz()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()

            })
            it('Criando Tarefa com frequencia "N/D', () => {
                taskPage.clickNewtask()
                taskPage.selectCategory()
                taskPage.sendTextResume()
                taskPage.sendTextDescribe()
                taskPage.selectFrequencyND()
                taskPage.clickSaveNewTask()
                // Validacao(Assert)
                taskPage.confirmTaskCreate()
            })
        })
    })




