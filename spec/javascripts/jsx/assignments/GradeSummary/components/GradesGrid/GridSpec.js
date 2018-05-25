/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {mount} from 'enzyme'

import Grid from 'jsx/assignments/GradeSummary/components/GradesGrid/Grid'

QUnit.module('GradeSummary Grid', suiteHooks => {
  let props
  let wrapper

  suiteHooks.beforeEach(() => {
    props = {
      graders: [
        {graderId: '1101', graderName: 'Miss Frizzle'},
        {graderId: '1102', graderName: 'Mr. Keating'}
      ],
      grades: {
        1111: {
          1101: {
            grade: 'A',
            graderId: '1101',
            id: '4601',
            score: 10,
            selected: false,
            studentId: '1111'
          },
          1102: {
            grade: 'B',
            graderId: '1102',
            id: '4602',
            score: 8.9,
            selected: false,
            studentId: '1111'
          }
        },
        1112: {
          1102: {
            grade: 'C',
            graderId: '1102',
            id: '4603',
            score: 7.8,
            selected: false,
            studentId: '1112'
          }
        },
        1113: {
          1101: {
            grade: 'A',
            graderId: '1101',
            id: '4604',
            score: 10,
            selected: false,
            studentId: '1113'
          }
        }
      },
      rows: [
        {studentId: '1111', studentName: 'Adam Jones'},
        {studentId: '1112', studentName: 'Betty Ford'},
        {studentId: '1113', studentName: 'Charlie Xi'},
        {studentId: '1114', studentName: 'Dana Smith'}
      ]
    }
  })

  suiteHooks.afterEach(() => {
    wrapper.unmount()
  })

  function mountComponent() {
    wrapper = mount(<Grid {...props} />)
  }

  test('includes a column header for each grader', () => {
    mountComponent()
    strictEqual(wrapper.find('th.GradesGrid__GraderHeader').length, 2)
  })

  test('displays the grader names in the column headers', () => {
    mountComponent()
    const headers = wrapper.find('th.GradesGrid__GraderHeader')
    deepEqual(headers.map(header => header.text()), ['Miss Frizzle', 'Mr. Keating'])
  })

  test('enumerates graders for names when graders are anonymous', () => {
    props.graders[0].graderName = null
    props.graders[1].graderName = null
    mountComponent()
    const headers = wrapper.find('th.GradesGrid__GraderHeader')
    deepEqual(headers.map(header => header.text()), ['Grader 1', 'Grader 2'])
  })

  test('includes a GridRow for each student', () => {
    mountComponent()
    strictEqual(wrapper.find('GridRow').length, 4)
  })

  test('sends graders to each GridRow', () => {
    mountComponent()
    wrapper.find('GridRow').forEach(gridRow => {
      strictEqual(gridRow.prop('graders'), props.graders)
    })
  })

  test('sends student-specific grades to each GridRow', () => {
    mountComponent()
    const gridRow = wrapper.find('GridRow').at(1)
    strictEqual(gridRow.prop('grades'), props.grades[1112])
  })

  test('sends the related row to each GridRow', () => {
    mountComponent()
    const gridRow = wrapper.find('GridRow').at(1)
    strictEqual(gridRow.prop('row'), props.rows[1])
  })
})