/**
 * Copyright 2010-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.gx.bos.repository;

import java.util.List;

import org.gx.bos.domain.DemoApplication;
import org.gx.bos.domain.DemoApplicationInstance;
import org.macula.core.repository.MaculaJpaRepository;

/**
 * <p> </p>
 * 
 * @since 2011-2-23
 * @author Wilson Luo
 * @version $Id: DemoApplicationInstanceRepository.java 5956 2015-11-17 03:48:27Z wzp $
 */
public interface DemoApplicationInstanceRepository extends MaculaJpaRepository<DemoApplicationInstance, Long> {

	List<DemoApplicationInstance> findByApplication(DemoApplication application);
}