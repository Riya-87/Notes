/**
 * ========================================================================================================================
 * AuraNotes OS — Elite Software Application Script Controller Workspace Module
 * ========================================================================================================================
 */

class AuraEliteNotesEngine {
    constructor() {
        // App State Properties Registry Model Configurations
        this.notes = JSON.parse(localStorage.getItem('aura_elite_notes_registry')) || this.getPremiumInitialSeedingData();
        this.activeTheme = localStorage.getItem('aura_elite_theme_model') || 'light';
        this.activeView = 'dashboard';
        this.activeCategoryFilter = null;
        this.searchQuery = '';
        this.currentSortOrder = 'newest';
        
        // Asynchronous Active Core Handlers
        this.activeEditingNoteId = null;
        this.deleteTargetNoteId = null;
        this.autoSaveTimerInterval = null;

        // Initialize Native Components Pipelines
        this.initDOMTreeHandles();
        this.applyInterfaceThemeConfiguration();
        this.bootAmbientParticleEngineCanvas();
        this.registerSystemInteractivityEventListeners();
        this.renderWorkspaceInterfaceCore();
    }

    initDOMTreeHandles() {
        // Navigation Frames Elements
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
        this.sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.navItems = document.querySelectorAll('.nav-item');
        this.categoryFilterList = document.getElementById('categoryFilterList');
        
        // Control Bar Handlers
        this.searchInput = document.getElementById('searchInput');
        this.sortSelect = document.getElementById('sortSelect');
        this.newNoteBtn = document.getElementById('newNoteBtn');
        
        // Window Containers Displays
        this.dashboardView = document.getElementById('dashboardView');
        this.notesView = document.getElementById('notesView');
        this.notesGrid = document.getElementById('notesGrid');
        this.pinnedDashboardGrid = document.getElementById('pinnedDashboardGrid');
        this.emptyState = document.getElementById('emptyState');
        this.emptyStateCreateBtn = document.getElementById('emptyStateCreateBtn');
        this.viewContainerTitle = document.getElementById('viewContainerTitle');
        
        // Telemetry Elements
        this.statTotalNotes = document.getElementById('statTotalNotes');
        this.statPinnedNotes = document.getElementById('statPinnedNotes');
        this.statFavNotes = document.getElementById('statFavNotes');
        this.statCategories = document.getElementById('statCategories');

        // Drawer Sheets Inputs Forms Elements
        this.editorOverlay = document.getElementById('editorOverlay');
        this.editorPanelTitle = document.getElementById('editorPanelTitle');
        this.editorForm = document.getElementById('editorForm');
        this.noteTitleInput = document.getElementById('noteTitleInput');
        this.noteCategoryInput = document.getElementById('noteCategoryInput');
        this.noteContentInput = document.getElementById('noteContentInput');
        this.charCountDisplay = document.getElementById('charCountDisplay');
        this.wordCountDisplay = document.getElementById('wordCountDisplay');
        this.autoSaveIndicator = document.getElementById('autoSaveIndicator');
        
        this.editorPinBtn = document.getElementById('editorPinBtn');
        this.editorFavBtn = document.getElementById('editorFavBtn');
        this.editorCloseBtn = document.getElementById('editorCloseBtn');
        this.editorCancelBtn = document.getElementById('editorCancelBtn');
        
        // Modal Structural Panels
        this.deleteConfirmModal = document.getElementById('deleteConfirmModal');
        this.deleteCancelBtn = document.getElementById('deleteCancelBtn');
        this.deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
        this.toastWrapper = document.getElementById('toastWrapper');
    }

    /**
     * Ambient Canvas Particle Graphics System with Mouse Path Proximity Integration
     */
    bootAmbientParticleEngineCanvas() {
        const canvas = document.getElementById('ambientParticleCanvas');
        const ctx = canvas.getContext('2d');
        let pointsArray = [];
        
        const mouseCoordinatesTracker = { x: null, y: null, targetProximityRadius: 160 };
        window.addEventListener('mousemove', (e) => {
            mouseCoordinatesTracker.x = e.clientX;
            mouseCoordinatesTracker.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouseCoordinatesTracker.x = null;
            mouseCoordinatesTracker.y = null;
        });

        const resizeCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeParticleCloudSystem();
        };

        class FluidGeometricParticleNode {
            constructor() {
                this.resetParticlePropertiesValues();
            }
            resetParticlePropertiesValues() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2.5 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.baseOpacity = Math.random() * 0.25 + 0.05;
                this.opacity = this.baseOpacity;
            }
            updateEngineCycles() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.resetParticlePropertiesValues();
                }

                // Interaction: Mouse Path Proximity Glow Response Logic
                if (mouseCoordinatesTracker.x !== null && mouseCoordinatesTracker.y !== null) {
                    const dx = this.x - mouseCoordinatesTracker.x;
                    const dy = this.y - mouseCoordinatesTracker.y;
                    const spatialDistanceBetweenNodes = Math.sqrt(dx * dx + dy * dy);
                    
                    if (spatialDistanceBetweenNodes < mouseCoordinatesTracker.targetProximityRadius) {
                        const integrationFactor = (1 - (spatialDistanceBetweenNodes / mouseCoordinatesTracker.targetProximityRadius));
                        this.opacity = Math.min(0.7, this.baseOpacity + integrationFactor * 0.5);
                        this.x += (dx / spatialDistanceBetweenNodes) * 0.5; // Subtle particle push physics
                        this.y += (dy / spatialDistanceBetweenNodes) * 0.5;
                    } else {
                        if(this.opacity > this.baseOpacity) this.opacity -= 0.01;
                    }
                } else {
                    if(this.opacity > this.baseOpacity) this.opacity -= 0.01;
                }
            }
            drawParticleGraphicFrame() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                const colorHexCode = document.documentElement.getAttribute('data-theme') === 'light' ? '99, 102, 241' : '129, 140, 248';
                ctx.fillStyle = `rgba(${colorHexCode}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const initializeParticleCloudSystem = () => {
            pointsArray = [];
            const densityCoefficientCount = Math.floor((canvas.width * canvas.height) / 9000);
            for(let i = 0; i < Math.min(120, densityCoefficientCount); i++) {
                pointsArray.push(new FluidGeometricParticleNode());
            }
        };

        const renderLoopAnimationEngineFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pointsArray.forEach(p => {
                p.updateEngineCycles();
                p.drawParticleGraphicFrame();
            });
            requestAnimationFrame(renderLoopAnimationEngineFrame);
        };

        window.addEventListener('resize', resizeCanvasDimensions);
        resizeCanvasDimensions();
        requestAnimationFrame(renderLoopAnimationEngineFrame);
    }

    registerSystemInteractivityEventListeners() {
        this.themeToggleBtn.addEventListener('click', () => this.toggleInterfaceThemeModelMode());

        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.navItems.forEach(n => n.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.switchActiveWorkspaceViewPaneSegment(e.currentTarget.dataset.view);
            });
        });

        this.sidebarOpenBtn.addEventListener('click', () => this.sidebar.classList.add('open'));
        this.sidebarCloseBtn.addEventListener('click', () => this.sidebar.classList.remove('open'));

        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            this.renderWorkspaceInterfaceCore();
        });
        this.sortSelect.addEventListener('change', (e) => {
            this.currentSortOrder = e.target.value;
            this.renderWorkspaceInterfaceCore();
        });

        this.newNoteBtn.addEventListener('click', () => this.openComposerPanelFlyoutWindow());
        this.emptyStateCreateBtn.addEventListener('click', () => this.openComposerPanelFlyoutWindow());
        this.sidebarCloseBtn.addEventListener('click', () => this.closeComposerPanelFlyoutWindow());
        this.editorCloseBtn.addEventListener('click', () => this.closeComposerPanelFlyoutWindow());
        this.editorCancelBtn.addEventListener('click', () => this.closeComposerPanelFlyoutWindow());
        
        this.editorPinBtn.addEventListener('click', () => this.toggleComposerPinStateFlag());
        this.editorFavBtn.addEventListener('click', () => this.toggleComposerFavStateFlag());
        this.noteContentInput.addEventListener('input', () => this.executeLiveTextAnalyticsMetricsCalculators());
        
        this.editorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveComposerFormDataPipelineStream();
        });

        this.deleteCancelBtn.addEventListener('click', () => this.closeDestructiveActionModalWindow());
        this.deleteConfirmBtn.addEventListener('click', () => this.executeConfirmedNodeDeletionAction());

        // Document-wide Hotkeys Mappings
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'n') { e.preventDefault(); this.openComposerPanelFlyoutWindow(); }
            if (e.ctrlKey && e.key.toLowerCase() === 's') { e.preventDefault(); if (this.editorOverlay.classList.contains('active')) this.saveComposerFormDataPipelineStream(); }
            if (e.ctrlKey && e.key.toLowerCase() === 'f') { e.preventDefault(); this.searchInput.focus(); this.searchInput.select(); }
        });

        // Initialize Button Click Ripple Custom Hooks Directives
        document.querySelectorAll('.btn-ripple').forEach(button => {
            button.addEventListener('click', function(e) {
                const circleWaveElement = document.createElement('span');
                const maxDiameterValue = Math.max(this.clientWidth, this.clientHeight);
                const rectBounds = this.getBoundingClientRect();
                
                circleWaveElement.style.width = circleWaveElement.style.height = `${maxDiameterValue}px`;
                circleWaveElement.style.left = `${e.clientX - rectBounds.left - maxDiameterValue/2}px`;
                circleWaveElement.style.top = `${e.clientY - rectBounds.top - maxDiameterValue/2}px`;
                circleWaveElement.className = 'ripple-wave';
                
                this.appendChild(circleWaveElement);
                circleWaveElement.addEventListener('animationend', () => circleWaveElement.remove());
            });
        });
    }

    renderWorkspaceInterfaceCore() {
        this.renderSidebarCategoryFiltersTreeList();
        this.calculateAndRenderMetricsTelemetryDashboard();

        const dataDatasetStream = this.getProcessedNotesDatasetStream();

        if (this.activeView === 'dashboard') {
            this.dashboardView.classList.remove('hidden');
            this.notesView.classList.add('hidden');
            const pinnedList = dataDatasetStream.filter(n => n.pinned);
            this.renderNotesGridDOMTreeNodes(this.pinnedDashboardGrid, pinnedList);
        } else {
            this.dashboardView.classList.add('hidden');
            this.notesView.classList.remove('hidden');
            this.updateWorkspaceContainerTitleStringTextContent();
            this.renderNotesGridDOMTreeNodes(this.notesGrid, dataDatasetStream);
        }
    }

    updateWorkspaceContainerTitleStringTextContent() {
        if (this.activeCategoryFilter) {
            this.viewContainerTitle.innerText = `Segment: ${this.activeCategoryFilter}`;
        } else if (this.activeView === 'favorites') {
            this.viewContainerTitle.innerText = 'Starred Core Components';
        } else {
            this.viewContainerTitle.innerText = 'All Dynamic Nodes';
        }
    }

    calculateAndRenderMetricsTelemetryDashboard() {
        this.statTotalNotes.innerText = this.notes.length;
        this.statPinnedNotes.innerText = this.notes.filter(n => n.pinned).length;
        this.statFavNotes.innerText = this.notes.filter(n => n.favorite).length;
        this.statCategories.innerText = new Set(this.notes.map(n => n.category)).size;
    }

    renderSidebarCategoryFiltersTreeList() {
        const globalCategoriesListArray = ['Personal', 'Work', 'Study', 'Ideas', 'Others'];
        this.categoryFilterList.innerHTML = '';

        globalCategoriesListArray.forEach(cat => {
            const quantitativeCount = this.notes.filter(n => n.category === cat).length;
            const btnNodeElement = document.createElement('button');
            btnNodeElement.className = `nav-item ${this.activeCategoryFilter === cat ? 'active' : ''}`;
            btnNodeElement.innerHTML = `
                <span class="category-dot badge-${cat.toLowerCase()}"></span>
                <span style="flex:1; font-weight:600;">${cat}</span>
                <span class="category-count-pill" style="font-size:0.8rem; opacity:0.7; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:8px;">${quantitativeCount}</span>
            `;
            btnNodeElement.addEventListener('click', () => {
                this.navItems.forEach(n => n.classList.remove('active'));
                this.activeView = 'all-notes';
                this.activeCategoryFilter = (this.activeCategoryFilter === cat) ? null : cat;
                this.renderWorkspaceInterfaceCore();
            });
            this.categoryFilterList.appendChild(btnNodeElement);
        });
    }

    getProcessedNotesDatasetStream() {
        let calculationsBuffer = [...this.notes];

        if (this.activeCategoryFilter) calculationsBuffer = calculationsBuffer.filter(n => n.category === this.activeCategoryFilter);
        if (this.activeView === 'favorites') calculationsBuffer = calculationsBuffer.filter(n => n.favorite);
        if (this.searchQuery) {
            calculationsBuffer = calculationsBuffer.filter(n => 
                n.title.toLowerCase().includes(this.searchQuery) || 
                n.content.toLowerCase().includes(this.searchQuery)
            );
        }

        calculationsBuffer.sort((a, b) => {
            if (this.currentSortOrder === 'oldest') return a.updatedAt - b.updatedAt;
            if (this.currentSortOrder === 'alphabetical') return a.title.localeCompare(b.title);
            return b.updatedAt - a.updatedAt; // Fallback allocation stream order mapping: newest first
        });

        calculationsBuffer.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
        return calculationsBuffer;
    }

    /**
     * Cards Grid Tree Native Injector with Advanced Physics Tilt Triggers Micro Interactions
     */
    renderNotesGridDOMTreeNodes(targetDOMWrapperContainerElementHandle, datasetStreamArrayInput) {
        targetDOMWrapperContainerElementHandle.innerHTML = '';

        if (datasetStreamArrayInput.length === 0) {
            if (targetDOMWrapperContainerElementHandle === this.notesGrid) {
                this.emptyState.classList.remove('hidden');
            } else {
                targetDOMWrapperContainerElementHandle.innerHTML = `<p class="empty-inline-hint-string" style="color:var(--text-muted); font-size:1rem; grid-column:1/-1; padding:32px 0; font-weight:500;">No active elements pinned to this workspace stream mapping.</p>`;
            }
            return;
        }

        if (targetDOMWrapperContainerElementHandle === this.notesGrid) this.emptyState.classList.add('hidden');

        datasetStreamArrayInput.forEach(noteNodeObjectItem => {
            const cardFrameNodeElement = document.createElement('div');
            cardFrameNodeElement.className = `note-card glass-premium interactive-card`;
            cardFrameNodeElement.setAttribute('data-id', noteNodeObjectItem.id);
            
            const numericalWordsMetricsCountValue = this.calculateWordCountMetrics(noteNodeObjectItem.content);
            const humanReadableTimeDateStringFormat = new Date(noteNodeObjectItem.updatedAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
            });

            cardFrameNodeElement.innerHTML = `
                <div>
                    <div class="note-card-header">
                        <h3 class="note-card-title">${this.sanitizeHTMLStringInputsDataEntities(noteNodeObjectItem.title)}</h3>
                        <div class="note-card-actions">
                            <button class="action-dot-btn ${noteNodeObjectItem.pinned ? 'active-pin' : ''}" data-action="pin" title="Pin Note">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </button>
                            <button class="action-dot-btn ${noteNodeObjectItem.favorite ? 'active-fav' : ''}" data-action="favorite" title="Star Note">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </button>
                            <button class="action-dot-btn" data-action="copy" title="Copy Content text to System Clipboard">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                            </button>
                            <button class="action-dot-btn" data-action="export" title="Export as plain text document plain asset asset">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </button>
                            <button class="action-dot-btn" data-action="delete" style="color:var(--danger-color)" title="Initialize memory purge process action">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="note-card-body">${this.sanitizeHTMLStringInputsDataEntities(noteNodeObjectItem.content).replace(/\n/g, '<br>')}</div>
                </div>
                <div class="note-card-footer">
                    <span>${humanReadableTimeDateStringFormat} • ${numericalWordsMetricsCountValue} Words</span>
                    <span class="note-badge badge-${noteNodeObjectItem.category.toLowerCase()}">${noteNodeObjectItem.category}</span>
                </div>
            `;

            // Live Interactive 3D Card Hover Perspective Physics Engine Matrix
            cardFrameNodeElement.addEventListener('mousemove', (e) => {
                const rect = cardFrameNodeElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = ((y / rect.height) - 0.5) * -10; 
                const rotateY = ((x / rect.width) - 0.5) * 10;
                
                cardFrameNodeElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            cardFrameNodeElement.addEventListener('mouseleave', () => {
                cardFrameNodeElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });

            cardFrameNodeElement.addEventListener('click', (e) => {
                const actionButtonClosestHandle = e.target.closest('.action-dot-btn');
                if (actionButtonClosestHandle) {
                    e.stopPropagation();
                    this.executeCardActionDispatches(noteNodeObjectItem.id, actionButtonClosestHandle.dataset.action);
                } else {
                    this.openComposerPanelFlyoutWindow(noteNodeObjectItem.id);
                }
            });

            targetDOMWrapperContainerElementHandle.appendChild(cardFrameNodeElement);
        });
    }

    executeCardActionDispatches(id, actionKey) {
        const targetNodeModelMatchInstance = this.notes.find(n => n.id === id);
        if (!targetNodeModelMatchInstance) return;

        switch (actionKey) {
            case 'pin':
                targetNodeModelMatchInstance.pinned = !targetNodeModelMatchInstance.pinned;
                this.persistWorkspaceStateDataStoreToLocalStorage();
                this.renderWorkspaceInterfaceCore();
                this.triggerNotificationToastMessage(targetNodeModelMatchInstance.pinned ? 'Component structure pinned' : 'Component detached from board layout');
                break;
            case 'favorite':
                targetNodeModelMatchInstance.favorite = !targetNodeModelMatchInstance.favorite;
                this.persistWorkspaceStateDataStoreToLocalStorage();
                this.renderWorkspaceInterfaceCore();
                this.triggerNotificationToastMessage(targetNodeModelMatchInstance.favorite ? 'Asset registered to starred lists' : 'Asset star classification removed');
                break;
            case 'copy':
                this.forwardBufferStringToSystemClipboardPipeline(`${targetNodeModelMatchInstance.title}\n\n${targetNodeModelMatchInstance.content}`);
                break;
            case 'export':
                this.executeFileCompilationStreamAttachmentDownloadPipeline(targetNodeModelMatchInstance);
                break;
            case 'delete':
                this.openDestructiveActionModalWindow(id);
                break;
        }
    }

    switchActiveWorkspaceViewPaneSegment(viewKeyTargetString) {
        this.activeView = viewKeyTargetString;
        this.activeCategoryFilter = null;
        this.sidebar.classList.remove('open');
        this.renderWorkspaceInterfaceCore();
    }

    openComposerPanelFlyoutWindow(noteId = null) {
        this.activeEditingNoteId = noteId;
        this.editorForm.reset();
        
        if (noteId) {
            this.editorPanelTitle.innerText = "Modify Architecture Node";
            const currentSelectedNodeData = this.notes.find(n => n.id === noteId);
            this.noteTitleInput.value = currentSelectedNodeData.title;
            this.noteCategoryInput.value = currentSelectedNodeData.category;
            this.noteContentInput.value = currentSelectedNodeData.content;
            this.updateComposerToggleActionIconsViewRepresentation(currentSelectedNodeData.pinned, currentSelectedNodeData.favorite);
        } else {
            this.editorPanelTitle.innerText = "Spawn Component Block Node";
            this.updateComposerToggleActionIconsViewRepresentation(false, false);
            if(this.activeCategoryFilter) this.noteCategoryInput.value = this.activeCategoryFilter;
        }

        this.executeLiveTextAnalyticsMetricsCalculators();
        this.editorOverlay.classList.add('active');
        this.noteTitleInput.focus();
        this.initializeBackgroundAutoSaveTelemetryLoop();
    }

    closeComposerPanelFlyoutWindow() {
        this.editorOverlay.classList.remove('active');
        this.activeEditingNoteId = null;
        this.terminateBackgroundAutoSaveTelemetryLoop();
        this.renderWorkspaceInterfaceCore();
    }

    updateComposerToggleActionIconsViewRepresentation(pinnedFlag, favoriteFlag) {
        this.editorPinBtn.className = `btn-icon ${pinnedFlag ? 'active-pin' : ''}`;
        this.editorFavBtn.className = `btn-icon ${favoriteFlag ? 'active-fav' : ''}`;
    }

    toggleComposerPinStateFlag() {
        this.editorPinBtn.classList.toggle('active-pin');
        if (this.activeEditingNoteId) {
            const target = this.notes.find(n => n.id === this.activeEditingNoteId);
            if (target) { target.pinned = this.editorPinBtn.classList.contains('active-pin'); this.persistWorkspaceStateDataStoreToLocalStorage(); }
        }
    }

    toggleComposerFavStateFlag() {
        this.editorFavBtn.classList.toggle('active-fav');
        if (this.activeEditingNoteId) {
            const target = this.notes.find(n => n.id === this.activeEditingNoteId);
            if (target) { target.favorite = this.editorFavBtn.classList.contains('active-fav'); this.persistWorkspaceStateDataStoreToLocalStorage(); }
        }
    }

    executeLiveTextAnalyticsMetricsCalculators() {
        const charLenValue = this.noteContentInput.value.length;
        const totalWordsCalculationsCount = this.calculateWordCountMetrics(this.noteContentInput.value);
        
        this.charCountDisplay.innerText = `${charLenValue} / 2000 Units`;
        this.wordCountDisplay.innerText = `${totalWordsCalculationsCount} Words`;
    }

    calculateWordCountMetrics(rawInputStringText) {
        if (!rawInputStringText || rawInputStringText.trim() === '') return 0;
        return rawInputStringText.trim().split(/\s+/).filter(token => token.length > 0).length;
    }

    saveComposerFormDataPipelineStream() {
        const titleTextValue = this.noteTitleInput.value.trim();
        const contentTextBodyValue = this.noteContentInput.value;
        const optimalCategorySelectionValue = this.noteCategoryInput.value;

        if (!titleTextValue || !contentTextBodyValue) return;

        const dynamicTimestampClockInstance = Date.now();

        if (this.activeEditingNoteId) {
            const arrayIndexTargetPointer = this.notes.findIndex(n => n.id === this.activeEditingNoteId);
            if (arrayIndexTargetPointer !== -1) {
                this.notes[arrayIndexTargetPointer] = {
                    ...this.notes[arrayIndexTargetPointer],
                    title: titleTextValue,
                    content: contentTextBodyValue,
                    category: optimalCategorySelectionValue,
                    updatedAt: dynamicTimestampClockInstance
                };
            }
        } else {
            const freshInitialNoteNodeAllocationBlockBlueprint = {
                id: 'aura_node_uid_' + Math.random().toString(36).substr(2, 9),
                title: titleTextValue,
                content: contentTextBodyValue,
                category: optimalCategorySelectionValue,
                pinned: this.editorPinBtn.classList.contains('active-pin'),
                favorite: this.editorFavBtn.classList.contains('active-fav'),
                createdAt: dynamicTimestampClockInstance,
                updatedAt: dynamicTimestampClockInstance
            };
            this.notes.unshift(freshInitialNoteNodeAllocationBlockBlueprint);
        }

        this.persistWorkspaceStateDataStoreToLocalStorage();
        this.triggerNotificationToastMessage('Data layers synchronized successfully');
        this.closeComposerPanelFlyoutWindow();
    }

    initializeBackgroundAutoSaveTelemetryLoop() {
        this.terminateBackgroundAutoSaveTelemetryLoop();
        this.autoSaveTimerInterval = setInterval(() => {
            if (!this.activeEditingNoteId) return;
            
            const target = this.notes.find(n => n.id === this.activeEditingNoteId);
            if (!target) return;

            const tVal = this.noteTitleInput.value.trim();
            const cVal = this.noteContentInput.value;

            if (tVal === target.title && cVal === target.content && this.noteCategoryInput.value === target.category) return;

            if(tVal) target.title = tVal;
            target.content = cVal;
            target.category = this.noteCategoryInput.value;
            target.updatedAt = Date.now();

            this.persistWorkspaceStateDataStoreToLocalStorage();
            
            this.autoSaveIndicator.classList.add('visible');
            setTimeout(() => this.autoSaveIndicator.classList.remove('visible'), 1500);
        }, 2000); // Polling loop checking delta every 2000ms
    }

    terminateBackgroundAutoSaveTelemetryLoop() {
        if (this.autoSaveTimerInterval) { clearInterval(this.autoSaveTimerInterval); this.autoSaveTimerInterval = null; }
    }

    openDestructiveActionModalWindow(targetNoteIdForPurge) {
        this.deleteTargetNoteId = targetNoteIdForPurge;
        this.deleteConfirmModal.classList.add('active');
    }

    closeDestructiveActionModalWindow() {
        this.deleteConfirmModal.classList.remove('active');
        this.deleteTargetNoteId = null;
    }

    executeConfirmedNodeDeletionAction() {
        if (!this.deleteTargetNoteId) return;

        this.notes = this.notes.filter(n => n.id !== this.deleteTargetNoteId);
        this.persistWorkspaceStateDataStoreToLocalStorage();
        
        this.closeDestructiveActionModalWindow();
        this.renderWorkspaceInterfaceCore();
        this.triggerNotificationToastMessage('Asset cleared from workspace index registers');
    }

    persistWorkspaceStateDataStoreToLocalStorage() {
        localStorage.setItem('aura_elite_notes_registry', JSON.stringify(this.notes));
    }

    forwardBufferStringToSystemClipboardPipeline(textStringDataPayload) {
        navigator.clipboard.writeText(textStringDataPayload).then(() => {
            this.triggerNotificationToastMessage('Copied to system clipboard buffer');
        }).catch(() => {
            this.triggerNotificationToastMessage('Clipboard write error');
        });
    }

    executeFileCompilationStreamAttachmentDownloadPipeline(noteObjectNodeInstance) {
        const streamBufferContent = `==================================================\nAURA NOTES OS MODULE EXPORT DISPATCH SLATE\nTITLE: ${noteObjectNodeInstance.title}\nCLUSTER AREA: ${noteObjectNodeInstance.category}\nTIMESTAMP RECORD: ${new Date(noteObjectNodeInstance.updatedAt).toString()}\n==================================================\n\n${noteObjectNodeInstance.content}`;
        
        const blobDataStreamContainer = new Blob([streamBufferContent], { type: 'text/plain;charset=utf-8' });
        const virtualAnchorDownloadLinkTriggerElement = document.createElement('a');
        
        virtualAnchorDownloadLinkTriggerElement.href = URL.createObjectURL(blobDataStreamContainer);
        virtualAnchorDownloadLinkTriggerElement.download = `aura_export_${noteObjectNodeInstance.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.txt`;
        
        document.body.appendChild(virtualAnchorDownloadLinkTriggerElement);
        virtualAnchorDownloadLinkTriggerElement.click();
        document.body.removeChild(virtualAnchorDownloadLinkTriggerElement);
        this.triggerNotificationToastMessage('.txt download initialized');
    }

    sanitizeHTMLStringInputsDataEntities(rawInputStringText) {
        const transformationCodeDictionaryTableMap = {
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '/': '&#x2F;'
        };
        return rawInputStringText.replace(/[&<>"'\/]/g, (matchingCharacterToken) => transformationCodeDictionaryTableMap[matchingCharacterToken]);
    }

    triggerNotificationToastMessage(messageDisplayStringText) {
        const toastNodeBlockElement = document.createElement('div');
        toastNodeBlockElement.className = 'toast';
        toastNodeBlockElement.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${messageDisplayStringText}</span>
        `;
        
        this.toastWrapper.appendChild(toastNodeBlockElement);

        setTimeout(() => {
            toastNodeBlockElement.classList.add('exit');
            toastNodeBlockElement.addEventListener('animationend', () => toastNodeBlockElement.remove());
        }, 2500);
    }

    toggleInterfaceThemeModelMode() {
        this.activeTheme = (this.activeTheme === 'light') ? 'dark' : 'light';
        localStorage.setItem('aura_elite_theme_model', this.activeTheme);
        this.applyInterfaceThemeConfiguration();
    }

    applyInterfaceThemeConfiguration() {
        document.documentElement.setAttribute('data-theme', this.activeTheme);
        const textLabelHandle = this.themeToggleBtn.querySelector('.theme-label');
        if (textLabelHandle) {
            textLabelHandle.innerText = this.activeTheme === 'light' ? 'Light Space' : 'Dark Matrix';
        }
    }

    getPremiumInitialSeedingData() {
        const clockTimeNowValue = Date.now();
        return [
            {
                id: 'aura_node_uid_seed1',
                title: '⚡ Welcome to AuraNotes infrastructure Engine',
                content: 'Your premium, production-optimized desktop workstation environment.\n\n🔥 Interactive Workspace Tuning Elements:\n• Particle Grid: Move your mouse across the background grid canvas to manipulate vector trace particles.\n• 3D Card Dynamics: Hover your pointer boundaries across node grid modules to test perspective card transformations.',
                category: 'Personal',
                pinned: true,
                favorite: true,
                createdAt: clockTimeNowValue,
                updatedAt: clockTimeNowValue
            },
            {
                id: 'aura_node_uid_seed2',
                title: '🌌 Next-Gen Interface Mappings Optimization Log Architecture',
                content: '• Complete validation frameworks on memory tracking models layouts buffers arrays loops indices.\n• Scale dynamic particle canvas animation vectors to utilize core modern discrete GPU engine processing configurations loops systems.',
                category: 'Work',
                pinned: true,
                favorite: false,
                createdAt: clockTimeNowValue - 1800000,
                updatedAt: clockTimeNowValue - 1800000
            }
        ];
    }
}

// Global DOM Construction Trigger
document.addEventListener('DOMContentLoaded', () => {
    window.AuraPremiumNotesEngineInstance = new AuraEliteNotesEngine();
});